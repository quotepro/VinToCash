import { Component, OnInit } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';
import { DataService } from '@app/core/data.service';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  model = {};
  showProgress = true;
  constructor(private data: DataService, private nav: NavigationManagerService) {}

  ngOnInit() {
    setTimeout(() => this.showProgress = false, 5000);
  }

  get car() {
    return this.data.session.selectedVehicle;
  }

  get purchasingPower() {
    return Math.round(this.data.purchasingPower() / 500) * 500 + 500;
  }

  back() {
    this.nav.back(null);
  }

  purchase() {
    this.nav.forward(['/success']);
  }

}
