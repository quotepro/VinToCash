import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '@app/core/data.service';
import { ChromaCar } from '@app/model/chroma-car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit {

  page: 0;
  selectedVehicle: ChromaCar;
  showDetail: boolean;
  selectedIndex: number;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getInventory();
  }

  get model() {
    return this.data.session;
  }

  get vehicleList(): ChromaCar[] {
    return this.data.vehicles;
  }
  get installmentLabel() {
    switch (this.model.calc.selectedPeriod) {
      case 3:
        return 'Monthly';
      case 2:
        return 'Bi-Weekly';
      case 1:
        return 'Weekly';
    }
  }

  back() {
    this.router.navigate(['buy']);
  }
  search() {
    this.data.updateSession();
    this.data.getInventory();
  }
  clearFilter() {
    this.model.filter = '';
    this.search();
  }

  show_sale(car: ChromaCar) {
    return car.sale_price < car.adjusted_price - car.manufacturer_rebates_price;
  }

  showVehicleDetail(car: ChromaCar, i: number) {
    this.selectedVehicle = car;
    this.showDetail = true;
    this.selectedIndex = i;
    setTimeout(function() {
      document.getElementById('vehicelDetail').scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
  closeDetail() {
    this.showDetail = false;
    const id = 'car_' + this.selectedIndex;
    setTimeout(function() {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
  calculatePayment(car: ChromaCar) {
    return this.data.calculatePaymentAmount(car.sale_price);
  }

  buyNow(car: ChromaCar) {
    this.data.selectVehicle(car);
    this.router.navigate(['buy-now']);
  }
}
