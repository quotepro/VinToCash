import { Injectable } from '@angular/core';
import { DataSession } from '@app/model/data-session';
import { JsonApiService } from '@quotepro/aq3';
import { flatMap, concatMap, retry, catchError, map, filter } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NearbyDealer } from '@app/model/nearby-dealer';
import * as dealerList from 'assets/dealers.json';
import { Dealer } from '@app/model/dealer';
import { ActivatedRoute, Params } from '@angular/router';
import { ChromaCar } from '@app/model/chroma-car';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dealers: Array<Dealer> = [];
  session = new DataSession();
  photos: Array<string> = [];
  aq3Url = '';
  loading = false;
  vehicles: ChromaCar[];

  constructor(
    private aq3: JsonApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    ) {}

  init(aq3Url: string) {

    const stored = sessionStorage.getItem('v2c_session');
    if (stored) {
      Object.assign(this.session, JSON.parse(stored));
    } else {
      this.session.sid = this.aq3.newGuid();
      this.updateSession(this.session);
    }
    of(...dealerList['dealers']).subscribe( (d: Dealer) => {
      if (d.Description.indexOf('z-') === -1) {
        this.dealers.push(d);
      }
    });
    this.route.queryParams.subscribe( (parms: Params) => {
      const url = parms['url'];
      if (url) {
        this.session.url = url;
        this.updateSession();
      }
    });
    this.aq3.sid = this.session.sid;
    this.aq3.baseUrl = aq3Url;
    this.aq3Url = aq3Url;
  }

  getData(controller: string, action: string, data: any) {
    this.updateSession(data);
    return this.aq3.getJson(controller, action, data).pipe(flatMap(result => {
      if (result.form) {
        this.updateSession(result.form);
        return of(result.form);
      }
      return of(result);
    }));
  }
  getInterestRate(): any {
    const calc = this.session.calc;
    if (calc.creditScore > 780) {
      return .0360;
    }
    if (calc.creditScore > 690) {
      return .0495;
    }
    if (calc.creditScore > 660) {
      return .0700;
    }
    if (calc.creditScore > 620) {
      return .0972;
    }
    if (calc.creditScore > 590) {
      return .1406;
    }
    return .1525;
  }


  postData(controller: string, action: string, data: any) {
    this.updateSession(data);
    return this.aq3.postJson(controller, action, data).pipe(flatMap(result => {
      if (result.form) {
        this.updateSession(result.form);
        return of(result.form);
      }
      return of(result);
    }));
  }

  updateSession(data?: any) {
    try {
      if (data && data !== this.session) {
        Object.keys(data).forEach(key => {
          if (this.session.hasOwnProperty(key)) {
            this.session[key] = data[key];
          }
        });
      }
      sessionStorage.setItem('v2c_session', JSON.stringify(this.session));
    } catch (e) {
      console.log(e);
    }
  }

  isValid(step: string) {
    let requiredFields = {};
    switch (step) {
      case 'vinLookup':
        requiredFields = {
          'vinNumber': /^[A-HJ-NPR-Z0-9]{17}$/i,
          'name': /\w{2,}\s+\w{2,}/,
          // tslint:disable-next-line:max-line-length
          'email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'phone': /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          'zipcode': /^\d{5}(-?\d{4})?$/
        };
        break;
    }
    for (const field of Object.keys(requiredFields)) {
      if (!this.session[field] || !requiredFields[field].test(this.session[field]) ) {
        return false;
      }
    }
    return true;
  }
  lookupVehicle() {
    if (this.isValid('vinLookup')) {
      this.loading = true;
      this.geoCode();
      this.postData('Home', 'Prefill', this.session)
      .pipe(catchError( (err) => {
        this.loading = false;
        return of('an error occurred while posting the zip code');
      }))
      .subscribe(response => {
        if (response.nextUrl && response.nextUrl.indexOf('Location') > -1) {
          this.postData('Vehicle', 'VinLookup', this.session).pipe(catchError( (err) => {
            // this.loading = false;
            return of('an error occurred while looking up the vin');
          }))
          .subscribe(vehicle => {
            this.session.actualValue = vehicle.actualValue;
            this.session.year = vehicle.year;
            this.session.make = vehicle.make;
            this.session.model = vehicle.model || vehicle.modelDescription;
            this.updateSession();
            // this.loading = false;
          });
        }
      });
    }
  }

  geoCode() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
    this.session.zipcode + '&key=AIzaSyAEj0ENYCC4B47BtyIcU4kltgA2DnPH7vo')
      .pipe(
        retry(2),
        catchError(err => of('Error geocoding ' + this.session.zipcode + ': ' + err))
      ).subscribe(results => {
        const json: any = results;
        if (json.status === 'OK') {
          const geo = json.results[0].geometry.location;
          this.session.latitude = geo.lat;
          this.session.longitude = geo.lng;
        }
      });
  }

  updatePhotos() {
    const url = this.aq3Url + '/en/Vehicle/UploadPhoto';
    this.postData('Vehicle', 'RemoveExistingPhotos', null).subscribe(result => {
      of(...this.photos)
        .pipe(
          concatMap((photo: string, i: any) => {
              const formData = new FormData();
              formData.append('sid', this.session.sid);
              formData.append('photo', photo);
              formData.append('vinNumber', this.session.vinNumber);
              formData.append('index', i);
              return this.http.post(url, formData, { headers: new HttpHeaders( { 'enctype': 'multipart/form-data'}) } );
          }),
          retry(2),
          catchError(err => {
            console.log(err);
            return of('An error occurred while uploading photos');
          })
        ).subscribe(photoResult => {
           console.log(photoResult);
        });
    });
  }

  getNearbyDealers(limit: number): Array<NearbyDealer> {
    const z = { lat: this.session.latitude, lon: this.session.longitude };
    return this.dealers.sort((a: any , b: any) => {
      const dA = this.calculateDistance(z.lat, z.lon, a.Latitude, a.Longitude);
      const dB = this.calculateDistance(z.lat, z.lon, b.Latitude, b.Longitude);
      return dA - dB;
    }).slice(0, limit).map(dealer => {
      const nearby = new NearbyDealer(dealer);
      nearby.Distance = this.calculateDistance(z.lat, z.lon, nearby.Latitude, nearby.Longitude);
      return nearby;
    });
  }
  /* from https://www.movable-type.co.uk/scripts/latlong.html */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // radius in miles
    // const R = 6371e3; // radius of earth in metres

    const φ1 = this.degrees2Radians(lat1);
    const φ2 = this.degrees2Radians(lat2);
    const Δφ = this.degrees2Radians(lat2 - lat1);
    const Δλ = this.degrees2Radians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = Math.round(R * c * 10) / 10;
    return d;
  }

  getInventory() {
    // implement dealer/zipcode searching later.
    let purchasePrice = 0;
    switch (this.session.calc.selectedPeriod) {
      case 1:
        purchasePrice = this.session.calc.weeklyPurchasePower;
        break;
      case 2:
        purchasePrice = this.session.calc.biWeeklyPurchasePower;
        break;
      case 3:
        purchasePrice = this.session.calc.monthlyPurchasePower;
        break;
    }

    const queryParams = new HttpParams()
      .append('dealer_id', 'ewaldkia')
      .append('sale_price', purchasePrice.toString())
      .append('filter', this.session.filter)
      .append('limit', '100')
      .append('page', '1');

    this.vehicles = [];
    return this.http.get('/api/cars/search', { params: queryParams })
    .subscribe((response: Partial<ChromaCar>[]) => {
      of(...response)
      .pipe(filter(car => car['image_urls'].length > 0))
      .subscribe((car: Partial<ChromaCar>) => {
        this.vehicles.push(new ChromaCar(car));
      });
    });
  }

  calculatePaymentAmount(vehiclePrice: number) {
    const calc = this.session.calc;
    let freq;
    switch (calc.selectedPeriod) {
      case 1:
        freq = 52;
        break;
      case 2:
        freq = 26;
        break;
      case 3:
        freq = 12;
        break;
    }
    const loanLength = calc.loanLength * freq;
    const principal = vehiclePrice * 1.10; // add vehicle warranty
    // the 1st month of insurance is deducted from the downpayment,
    // because it's not financeable.
    return this.periodicPayment(principal, freq, this.getInterestRate(), loanLength);
  }

  calculatePurchasingPower(): any {
    const calc = this.session.calc;

    let periods = 12;
    // deduct 1st month insurance from purchasing power.
    const insurancePrice = 65;
    let interest = this.getInterestRate() / periods;
    let payments = calc.loanLength * periods;
    // the warranty is 10% of the purchase price.
    const monthlyFunds = Math.max(25, calc.monthlyPayment * .9);

    calc.loanAmount = Math.round(((monthlyFunds *
      ((1 - Math.pow( 1 + interest, - payments)) / interest)) - insurancePrice) / 100) * 100;
    calc.monthlyPurchasePower = calc.loanAmount + calc.downPayment;

    periods = 26;
    interest = this.getInterestRate() / periods;
    payments = calc.loanLength * periods;

    calc.biWeeklyPayment = calc.monthlyPayment / 2;
    let periodicLoanAmount = Math.round(((monthlyFunds / 2 *
      ((1 - Math.pow( 1 + interest, - payments)) / interest)) - insurancePrice) / 100) * 100;
    calc.biWeeklyPurchasePower = periodicLoanAmount + calc.downPayment;

    periods = 52;
    interest = this.getInterestRate() / periods;
    payments = calc.loanLength * periods;

    calc.weeklyPayment = calc.monthlyPayment / 4;
    periodicLoanAmount = Math.round(((monthlyFunds / 4 *
      ((1 - Math.pow( 1 + interest, - payments)) / interest)) - insurancePrice) / 100) * 100;
    calc.weeklyPurchasePower = periodicLoanAmount + calc.downPayment;
  }

  degrees2Radians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  periodicPayment(pv: number, freq: number, apr: number, periods: number): number {
      const rate = apr / freq;
      const x = Math.pow(1 + rate, periods);
      return (pv * x * rate) / (x - 1);
  }
}
