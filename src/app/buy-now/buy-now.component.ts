import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { ChromaCar } from '@app/model/chroma-car';
import { BuyNowForm } from '@app/model/buy-now-form';
import { Calculator } from '@app/model/calculator';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss']
})
export class BuyNowComponent implements OnInit {

  get car(): ChromaCar {
    return this.data.session.selectedVehicle;
  }

  model: BuyNowForm;

  get calc(): Calculator {
    return this.data.session.calc;
  }

  get selectedImage(): string {
    return this.car.imageList[0];
  }

  get paymentAmount(): number {
    let payment = this.calc.selectedPeriod === 2 ? this.calc.biWeeklyPayment : this.calc.monthlyPayment;
    if (this.model.addVehicleWarranty) {
      payment += this.calc.selectedPeriod === 2 ? 12 : 25;
    }
    return payment;
  }

  get paymentLabel(): string {
    return this.calc.selectedPeriod === 2 ? 'biweekly' : 'monthly';
  }
  constructor(private data: DataService, private nav: NavigationManagerService) {
    console.log('This component is obsolete. Stop using it.');
   }

  ngOnInit() {
    this.model = new BuyNowForm();
  }

  back() {
    this.nav.back('vehicle-search');
  }
  continue() {
    // nowhere to go yet.
  }
}
