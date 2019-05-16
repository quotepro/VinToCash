import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';
import { NavigationManagerService } from '@app/core/navigation-manager.service';
import { Checkout } from '@app/model/checkout';
import { Option } from '@app/model/option';
import { environment } from '@env/environment';

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

  model: Checkout = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    willTradeIn: false,
    income: null,
    ssn: null,
    yearsemployed: null,
    creditscore: null
  };

  creditScores: Array<Option> = [
    { value: '500', text: 'Poor Credit (&lt; 580)' },
    { value: '580', text: 'Fair Credit (580-670)'},
    { value: '670', text: 'Good Credit (670-740)'},
    { value: '740', text: 'Very Good (740-780)'},
    { value: '780', text: 'Excellent (780+)'}
  ];

  get selectedPeriod() {
    return this.data.session.calc.selectedPeriod;
  }
  constructor(private data: DataService, private nav: NavigationManagerService) {
    const score = this.data.session.calc.creditScore;
    console.log('setting credit score: ' + score);
    if (score < 580) {
      this.model.creditscore = '500';
    } else if ( score < 670) {
      this.model.creditscore = '580';
    } else if ( score < 740) {
      this.model.creditscore = '670';
    } else if ( score < 780) {
      this.model.creditscore = '740';
    } else if (score >= 780 ) {
      this.model.creditscore = '780';
    } else {
      console.log('unmatched credit score ' + score);
    }

   }

  ngOnInit() {
  }

  get planPricing(): any {
    return this.data.planPricing;
  }

  toggleDetail(key: string) {
    this.planPricing['Platinum'][key].expanded = !this.planPricing['Platinum'][key].expanded;
  }
  get coverages() {
    return Object.keys(this.planPricing['Platinum']);
  }

  updateCreditScore(event: Event) {
    this.data.session.calc.creditScore = parseInt(this.model.creditscore, 10);
    console.log(this.data.session.calc.creditScore);
  }

  calculatePayment(car: ChromaCar, period?: number) {
    return this.data.calculateTieredPayment(car, period);
  }
  tradein() {
    if ( environment.sellingUrl) {
      this.nav.forward(['externalRedirect', {
        title: 'Trade-In',
        externalUrl: environment.sellingUrl,
        description: environment.sellingDesc
        }], { skipLocationChange: true });
        return;
    }
    this.nav.forward(['/trade-in']);
  }
  toMask(input: string): Array<any> {
    return this.data.toMask(input);
  }

  toggleCustom(key: string) {
    if (this.planPricing['Custom'][key]) {
      this.planPricing['Custom'][key] = null;
    } else {
      this.planPricing['Custom'][key] = this.planPricing['Platinum'][key];
      this.car.selectedPlan = 'Custom';
    }
  }

  selectPlan(plan: string) {
    this.car.selectedPlan = plan;
    if (plan !== 'Custom') {
      Object.keys(this.planPricing['Custom']).forEach(key => {
        this.planPricing['Custom'][key] = null;
      });
    }
  }
}
