import { Component, OnInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { ChromaCar } from '@app/model/chroma-car';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NavigationManagerService } from '@app/core/navigation-manager.service';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Calculator } from '@app/model/calculator';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit, AfterViewChecked {

  page = 0;
  selectedVehicle: ChromaCar;
  showDetail: boolean;
  selectedIndex: number;
  loading = false;

  constructor(
    private data: DataService,
    private nav: NavigationManagerService,
    private changedetector: ChangeDetectorRef,
    private scroller: ViewportScroller) { }

  ngOnInit() {
    if (!this.data.purchasingPower()) {
      this.nav.back('buy');
    }
    if (!this.vehicles || this.vehicles.length === 0) {
      this.getInventory();
    } else {
      this.changedetector.detectChanges();
    }
  }
  ngAfterViewChecked() {
    if (!this.loading && this.data.scrollPosition) {
      // console.log('restoring scroll position', this.data.vehicleSearchPage, this.data.scrollPosition);
      this.page = this.data.vehicleSearchPage;
      this.scroller.scrollToPosition(this.data.scrollPosition);
      this.changedetector.detectChanges();
      this.data.scrollPosition = null;
    }
  }

  updateFilter(newFilter: number) {
    this.filterby = newFilter;
    this.getInventory();
  }
  get model() {
    return this.data.session;
  }

  get filterby(): number {
    return this.calc.filterby || 2;
  }
  set filterby(newFilter: number) {
    this.calc.filterby = newFilter;
    this.data.updateSession();
  }

  get calc(): Calculator  {
    return this.data.session.calc;
  }
  get vehicles() {
    return this.data.vehicles || [];
  }
  get vehicleList(): ChromaCar[] {
    return this.data.vehicles.filter(car => {
        if (this.filterby === 1) {
          return true;
        }
        const pmt = this.calculatePayment(car);
        switch (this.data.session.calc.selectedPeriod) {
          case 1:
            return pmt < this.calc.weeklyPayment;
          case 2:
            return pmt < this.calc.biWeeklyPayment;
        }
        return pmt < this.calc.monthlyPayment;
      });
  }
  get installmentLabel() {
    return this.data.getInstallmentLabel();
  }

  back() {
    this.nav.back('buy');
  }
  search() {
    this.data.updateSession();
    this.getInventory();
  }
  clearFilter() {
    this.model.filter = '';
    this.search();
  }

  getInventory() {
    this.loading = true;
    this.data.getInventory().subscribe((result: any) => {
      // our list of vehicles has been updated.
      this.loading = false;
      this.changedetector.detectChanges();
    });
  }
  show_sale(car: ChromaCar) {
    return car.sale_price < car.adjusted_price - car.manufacturer_rebates_price;
  }

  showVehicleDetail(car: ChromaCar, i: number) {
    this.data.session.selectedVehicle = car;
    this.data.updateSession();
    this.selectedIndex = i;
    this.data.vehicleSearchPage = this.page;
    this.data.scrollPosition = this.scroller.getScrollPosition();
    this.nav.forward(['/vehicle-detail']);
  }
  calculatePayment(car: ChromaCar) {
    return this.data.calculateTieredPayment(car);
  }

  pageChanged(event: any) {
    this.page = event;
    this.scroller.scrollToPosition([0, 0]);
  }

  thumbSelected(car: ChromaCar, selectedThumb: string) {
    car.selectedImage = selectedThumb;
    return false;
  }
  thumbNavigated(car: ChromaCar, $event: any) {
    car.thumbPage = $event;
  }
}
