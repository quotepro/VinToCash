import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';
import { DataService } from '@app/core/data.service';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  showDetails: boolean;
  buyNow: boolean;
  reserve: boolean;

  get planPricing(): any {
    return this.data.planPricing;
  }

  get coverages() {
    return Object.keys(this.planPricing['Platinum']);
  }

  get car() {
    return this.data.session.selectedVehicle;
  }

  constructor(private data: DataService, private nav: NavigationManagerService) { }

  ngOnInit() {
    if (this.car.imageList.length > 0) {
      this.car.selectedImage = this.car.imageList[0];
    }
    if (!this.car.selectedPlan) {
      this.car.selectedPlan = 'Custom';
    }

    this.togglePanel(this.car.selectedPanel || 'details');
    window.scrollTo(0, 0);
  }

  back() {
    this.nav.back('vehicle-search');
  }
  get installmentLabel() {
    return this.data.getInstallmentLabel();
  }
  get installmentKey() {
    return this.data.getInstallmentKey();
  }
  calculatePayment(car: ChromaCar, period?: number) {
    return this.data.calculateTieredPayment(car, period);
  }

  togglePanel(panel: string) {
    this.car.selectedPanel = panel;
    this.data.updateSession();

    this.showDetails =
      this.buyNow =
        this.reserve = false;
    switch (panel) {
      case 'details':
        this.showDetails = !this.showDetails;
        this.buyNow =
          this.reserve = false;
        break;
      case 'buyNow':
        this.buyNow = !this.buyNow;
        this.showDetails =
          this.reserve = false;
        break;
      case 'reserve':
        this.reserve = !this.reserve;
        this.showDetails =
          this.buyNow = false;
        break;
    }
  }
  thumbSelected(car: ChromaCar, selectedThumb: string) {
    car.selectedImage = selectedThumb;
    return false;
  }
  thumbNavigated(car: ChromaCar, $event: any) {
    car.thumbPage = $event;
  }

  checkoutClicked() {
    this.nav.forward(['/checkout']);
  }
}
