import { Component, OnInit } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';
import { DataService } from '@app/core/data.service';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.scss']
})
export class SoldComponent implements OnInit {

  model = {};
  showProgress = true;
  constructor(private data: DataService, private nav: NavigationManagerService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showProgress = false;
      setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
    }, 5000);
  }

  get car() {
    return this.data.session.selectedVehicle;
  }

  get calc() {
    return this.data.getCalc();
  }
  calculatePayment(car: ChromaCar) {
    return this.data.calculateTieredPayment(car);
  }
  get purchasingPower() {
    return Math.round(this.data.purchasingPower() / 1000) * 1000 + 2000;
  }

  get selectedPlans() {
    const pricing = this.data.planPricing[this.car.selectedPlan];
    const platinum = this.data.planPricing['Platinum'];
    return Object.keys(pricing).filter(key => pricing[key]).map(key => pricing[key]);
  }

  get installmentLabel() {
    return 'Month';
  }

  get dueAtSigning() {
    return Math.max(0, this.data.getCalc().downPayment - this.dueNow);
  }

  get dueNow() {
    return 45;
  }
  back() {
    this.data.getCalc().monthlyPayment = this.data.calculatePaymentAmount(this.purchasingPower);
    this.nav.back('vehicle-search');
  }

  purchase() {
    this.nav.forward(['/success']);
  }

}
