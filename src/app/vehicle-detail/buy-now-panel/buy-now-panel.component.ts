import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-buy-now-panel',
  templateUrl: './buy-now-panel.component.html',
  styleUrls: ['./buy-now-panel.component.scss']
})
export class BuyNowPanelComponent implements OnInit {

  @Input() installmentLabel: string;
  @Input() installmentKey: string;
  @Input() car: ChromaCar;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() checkout: EventEmitter<any> = new EventEmitter<any>();

  model: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    willTradeIn: false
  };

  get selectedPeriod() {
    return this.data.session.calc.selectedPeriod;
  }
  constructor(private data: DataService, private nav: NavigationManagerService) { }

  ngOnInit() {
  }

  get planPricing(): any {
    return this.data.planPricing;
  }

  get coverages() {
    return Object.keys(this.planPricing['Platinum']);
  }

  calculatePayment(car: ChromaCar, period?: number) {
    return this.data.calculateTieredPayment(car, period);
  }
  tradein() {
    this.nav.forward(['/trade-in']);
  }
}
