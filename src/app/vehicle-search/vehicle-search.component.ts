import { Component, OnInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { ChromaCar } from '@app/model/chroma-car';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

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
    private router: Router,
    private changedetector: ChangeDetectorRef,
    private scroller: ViewportScroller) { }

  ngOnInit() {
    if (!this.data.purchasingPower()) {
      this.router.navigate(['/buy']);
    }
    if (!this.vehicleList || this.vehicleList.length === 0) {
      this.getInventory();
    } else {
      this.changedetector.detectChanges();
    }
  }
  ngAfterViewChecked() {
    if (!this.loading && this.data.scrollPosition) {
      console.log('restoring scroll position', this.data.vehicleSearchPage, this.data.scrollPosition);
      this.page = this.data.vehicleSearchPage;
      this.scroller.scrollToPosition(this.data.scrollPosition);
      this.changedetector.detectChanges();
      this.data.scrollPosition = null;
    }
  }

  get model() {
    return this.data.session;
  }

  get vehicleList(): ChromaCar[] {
    return this.data.vehicles;
  }
  get installmentLabel() {
    return this.data.getInstallmentLabel();
  }

  back() {
    this.router.navigate(['buy']);
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
    this.router.navigate(['/vehicle-detail']);
  }
  calculatePayment(car: ChromaCar) {
    return this.data.calculatePaymentAmount(car.sale_price);
  }

  buyNow(car: ChromaCar) {
    this.data.selectVehicle(car);
    this.router.navigate(['buy-now']);
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
