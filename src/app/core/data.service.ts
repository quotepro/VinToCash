import { Injectable } from '@angular/core';
import { DataSession } from '@app/model/data-session';
import { JsonApiService } from '@quotepro/aq3';
import { flatMap, concatMap, retry, catchError, map, filter, tap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NearbyDealer } from '@app/model/nearby-dealer';
import * as dealerList from 'assets/dealers.json';
import { Dealer } from '@app/model/dealer';
import { ActivatedRoute, Params } from '@angular/router';
import { ChromaCar } from '@app/model/chroma-car';
import { CoveragePlan } from '@app/model/coverage-plan';
import { Calculator } from '@app/model/calculator';

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
  scrollPosition: [number, number];
  vehicleSearchPage: number;

  private pricingPlans = {
    'Platinum': {
      'Warranty': new CoveragePlan({
        description: '72 Month/100K Mile Limited Warranty', weekly: 4, biweekly: 8, monthly: 20,
        expanded: false, detail: `
          Covers parts and diagnostics<br/>
          Towing &amp; rental car coverage<br/>
          Travel breakdown coverage` }),
      'Prepaid Maintenance': new CoveragePlan({
        description: 'Prepaid Maintenance', weekly: 6, biweekly: 12, monthly: 25,
        expanded: false, detail: `
          Prepaid lube, oil/filter changes<br/>
          15 point safety inspection<br/>
          Tire rotation<br/>
          Documented service records`
       }),
      'GAP': new CoveragePlan({ description: 'GAP Coverage', weekly: 2, biweekly: 4, monthly: 10,
      expanded: false, detail: `
        Pays the difference between the payoff value and actual cash value
        of your vehicle, up to 150% of MSRP` }),
      'Road Hazard': new CoveragePlan({ description: 'Road Hazard', weekly: 2, biweekly: 4, monthly: 10,
      expanded: false, detail: `
        Pays for repair or replacement of wheels &amp; tires damaged by road debris` }),
      'Ding & Dent': new CoveragePlan({ description: 'Ding & Dent', weekly: 2, biweekly: 4, monthly: 10,
      expanded: false, detail: `
        Dents & dings<br/>
        Interior &amp; exterior windshield repair<br/>
        Key Fob replacement` }),
      'Paint Protection': new CoveragePlan({ description: 'Paint Protection', weekly: 3, biweekly: 6, monthly: 15,
      expanded: false, detail: `
        Repair or buff cosmetic damage to painted exterior surfaces. Does not cover
        repairs due to comprehensive or collision damage of the vehicle` }),
    },
    'Gold': {
      'Warranty': new CoveragePlan({
        description: '72 Month/100K Mile Limited Warranty', weekly: 4, biweekly: 8, monthly: 20 }),
      'Prepaid Maintenance': new CoveragePlan({
        description: 'Prepaid Maintenance', weekly: 6, biweekly: 12, monthly: 25 }),
      'GAP': new CoveragePlan({ description: 'GAP Coverage', weekly: 2, biweekly: 4, monthly: 10 }),
      'Road Hazard': null as CoveragePlan,
      'Ding & Dent': null as CoveragePlan,
      'Paint Protection': null as CoveragePlan,
    },
    'Silver': {
      'Warranty': new CoveragePlan({
        description: '72 Month/100K Mile Limited Warranty', weekly: 4, biweekly: 8, monthly: 20 }),
      'Prepaid Maintenance': new CoveragePlan({
        description: 'Prepaid Maintenance', weekly: 6, biweekly: 12, monthly: 25 }),
      'GAP': null as CoveragePlan,
      'Road Hazard': null as CoveragePlan,
      'Ding & Dent': null as CoveragePlan,
      'Paint Protection': null as CoveragePlan,
    },
    'None': {
      'Warranty': null as CoveragePlan,
      'Prepaid Maintenance': null as CoveragePlan,
      'GAP': null as CoveragePlan,
      'Road Hazard': null as CoveragePlan,
      'Ding & Dent': null as CoveragePlan,
      'Paint Protection': null as CoveragePlan,
    }
  };


  get planPricing(): any {
    return this.pricingPlans;
  }

  constructor(
    private aq3: JsonApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  init(aq3Url: string) {

    const stored = sessionStorage.getItem('v2c_session');
    if (stored) {
      Object.assign(this.session, JSON.parse(stored));
    } else {
      this.session.sid = this.aq3.newGuid();
      this.updateSession(this.session);
    }
    of(...dealerList['dealers']).subscribe((d: Dealer) => {
      if (d.Description.indexOf('z-') === -1) {
        this.dealers.push(d);
      }
    });
    this.route.queryParams.subscribe((parms: Params) => {
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

  getCalc(): any {
    if (!this.session.calc) {
      this.session.calc = new Calculator({
        downPayment: 1000,
        loanAmount: 9000,
        loanLength: 5,
        creditScore: 700,
        monthlyPayment: 500,
        downChanged: false,
      });
    }
    return this.session.calc;
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
      if (!this.session[field] || !requiredFields[field].test(this.session[field])) {
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
        .pipe(catchError((err) => {
          this.loading = false;
          return of('an error occurred while posting the zip code');
        }))
        .subscribe(response => {
          if (response.nextUrl && response.nextUrl.indexOf('Location') > -1) {
            this.postData('Vehicle', 'VinLookup', this.session).pipe(catchError((err) => {
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
            return this.http.post(url, formData, { headers: new HttpHeaders({ 'enctype': 'multipart/form-data' }) });
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
    return this.dealers.sort((a: any, b: any) => {
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
    const purchasePrice = this.purchasingPower();

    const queryParams = new HttpParams()
      .append('dealer_id', 'ewaldkia')
      .append('sale_price', purchasePrice.toString())
      .append('filter', this.session.filter)
      .append('limit', '100')
      .append('page', '1');

    this.vehicles = [];
    return this.http.get('/api/cars/search', { params: queryParams })
      .pipe(
        tap((response: Partial<ChromaCar>[]) => {
          of(...response)
            .pipe(
              filter(car => car['image_urls'].length > 0)
            )
            .subscribe((car: Partial<ChromaCar>) => {
              const vehicle = new ChromaCar(car);
              this.vehicles.push(vehicle);
              return vehicle;
            });
        })
      );
  }
  purchasingPower(): any {
    switch (this.session.calc.selectedPeriod) {
      case 1:
        return this.session.calc.weeklyPurchasePower;
        break;
      case 2:
        return this.session.calc.biWeeklyPurchasePower;
        break;
      case 3:
        return this.session.calc.monthlyPurchasePower;
        break;
    }  }
  degrees2Radians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  selectedPayment(): number {
    const calc = this.session.calc;
    switch (calc.selectedPeriod) {
      case 1:
        return calc.weeklyPayment;
      case 2:
        return calc.biWeeklyPayment;
      case 3:
        return calc.monthlyPayment;
    }
  }

  getInterestRate(calc?: Calculator) {
    if (!calc) {
      calc = this.getCalc();
    }
    if (calc.interestRate) {
      return calc.interestRate;
    }
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

  calculateTieredPayment(car: ChromaCar, period?: number) {
    let payment = this.calculatePaymentAmount(car.sale_price, period);
    const plan = this.planPricing[car.selectedPlan];
    Object.keys(plan).forEach(key => {
      if (plan[key]) {
        payment += plan[key][this.getInstallmentKey()];
      }
    });
    return payment;
  }

  calculatePaymentAmount(vehiclePrice: number, period?: number, loanLength?: number, interestRate?: number): number {
    const calc = this.session.calc;
    if (!period) {
      period = calc.selectedPeriod;
    }
    if (!loanLength) {
     loanLength = calc.loanLength;
    }
    const principal = vehiclePrice;
    let payment = this.periodicPayment(principal, 12, interestRate || this.getInterestRate(), loanLength * 12);
    switch (period) {
      case 1: // weekly
        payment = payment * 14 / 52;
        break;
      case 2: // bi-weekly
        payment = payment * 13 / 26;
        break;
      case 3: // monthly
        break;
    }
    return payment;
  }

  calculatePurchasingPower(calc?: Calculator): any {
    if (!calc) {
      calc = this.getCalc();
    }

    let periods = 12;
    // deduct 1st month insurance from purchasing power.
    let interest = this.getInterestRate(calc) / periods;
    let payments = calc.loanLength * periods;
    // the warranty is 10% of the purchase price.
    const monthlyFunds = Math.max(25, calc.monthlyPayment);

    calc.loanAmount = Math.round(((monthlyFunds *
      ((1 - Math.pow(1 + interest, - payments)) / interest))) / 10) * 10;
    calc.monthlyPurchasePower = calc.loanAmount + calc.downPayment;

    periods = 26;
    interest = this.getInterestRate(calc) / periods;
    payments = calc.loanLength * periods;

    calc.biWeeklyPayment = calc.monthlyPayment * 13 / 26;
    let periodicLoanAmount = Math.round((calc.biWeeklyPayment *
      ((1 - Math.pow(1 + interest, - payments)) / interest)) / 10) * 10;
    calc.biWeeklyPurchasePower = periodicLoanAmount + calc.downPayment;
    calc.biWeeklyPayment += calc.transactionFee;

    periods = 52;
    interest = this.getInterestRate(calc) / periods;
    payments = calc.loanLength * periods;

    calc.weeklyPayment = calc.monthlyPayment * 14 / 52;
    periodicLoanAmount = Math.round(((calc.weeklyPayment *
      ((1 - Math.pow(1 + interest, - payments)) / interest))) / 10) * 10;
    calc.weeklyPurchasePower = periodicLoanAmount + calc.downPayment;
    calc.weeklyPayment += calc.transactionFee;

    this.calculateSavings();
  }

  calculateSavings(calc?: Calculator) {
    if (!calc) {
      calc = this.getCalc();
    }

    let interestPaid = 0;
    let periodicInterest = this.getInterestRate(calc) / 12;
    let balance = calc.monthlyPurchasePower;
    while (balance > 0) {
      const interest = balance * periodicInterest;
      interestPaid += interest;
      balance = balance + interest - calc.monthlyPayment;
    }

    let wklyInterestPaid = 0;
    const periodicPayment = calc.monthlyPayment * 14 / 52;
    const periods = 52;
    periodicInterest = this.getInterestRate(calc) / periods;
    balance = calc.monthlyPurchasePower;
    let payments = 0;
    while (balance > 0) {
      const interest = balance * periodicInterest;
      wklyInterestPaid += interest;
      balance += interest - periodicPayment;
      payments++;
    }

    calc.interestSaved = interestPaid - wklyInterestPaid;
    calc.effectiveTerm = payments / 52 * 12;
    calc.paymentsSaved = calc.loanLength * 12 - calc.effectiveTerm;
  }

  periodicPayment(pv: number, freq: number, apr: number, periods: number): number {
    const rate = apr / freq;
    const x = Math.pow(1 + rate, periods);
    return (pv * x * rate) / (x - 1);
  }

  selectVehicle(car: ChromaCar) {
    this.session.selectedVehicle = car;
    this.updateSession();
  }

  getInstallmentLabel(): any {
    switch (this.session.calc.selectedPeriod) {
      case 3:
        return 'Monthly';
      case 2:
        return 'Bi-Weekly';
      case 1:
        return 'Weekly';
    }
  }
  getInstallmentKey(): any {
    return this.getInstallmentLabel().replace('-', '').toLowerCase();
  }
  toMask(input: string): Array<any> {
    const mask = [];
    for (let i = 0; i < input.length; i++) {
      const ch = input.charAt(i);
      switch (ch) {
        case '0':
        case '9':
          mask.push(/\d/);
          break;
        case 'a':
        case 'A':
          mask.push(/[A-Za-z]/);
          break;
        case '!':
          mask.push(/[A-Z]/);
          break;
        case 'w':
        case 'W':
          mask.push(/\w/);
          break;
        default:
          mask.push(ch);
          break;
      }
    }
    return mask;
  }

}
