import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { CurrencyPipe } from '@angular/common';
import { Calculator } from '@app/model/calculator';
import { DataService } from '@app/core/data.service';
import { environment } from '@env/environment';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  get tagline() {
    return environment.tagline;
  }
  get model() {
    if (!this.data.session.calc) {
      this.data.session.calc = new Calculator({
        downPayment: 1000,
        loanAmount: 9000,
        loanLength: 7,
        creditScore: 700,
        monthlyPayment: 500,
        downChanged: false,
      });
    }
    return this.data.session.calc;
  }

  get extraPayment(): number {
    return this.model.monthlyPayment / 2 - (this.model.monthlyPayment / 4.33 * 2);
  }

  // source: https://www.valuepenguin.com/auto-loans/average-auto-loan-interest-rates as of 9/19/2018
  get interestRate(): number {
    return this.data.getInterestRate();
  }

  get dealerLogo() {
    return environment.dealerLogo;
  }

  installmentOptions: Options = {
    floor: 100,
    ceil: 2000,
    step: 10,
    translate: (value: number): string => {
      return this.cp.transform(value);
    }
  };

  purchaseOptions: Options = {
    floor: 1000,
    ceil: 60000,
    step: 100,
    translate: (value: number): string => {
      return this.cp.transform(value);
    }
  };

  downOptions: Options;

  lengthOptions: Options = {
    floor: 4,
    ceil: 7,
    showTicks: true,
    translate: (value: number): string => {
      return (value * 12) + ' months';
    }
  };

  periodOptions: Options = {
    floor: 1,
    ceil: 3,
    showTicks: true,
    translate: (value: number): string => {
      switch (value) {
        case 3:
          return 'Monthly';
        case 2:
          return 'Bi-Weekly';
        case 1:
          return 'Weekly';
      }
    }
  };

  scoreOptions: Options = {
    floor: 300,
    ceil: 850,
    showTicks: true,
    step: 10,
    translate: (value: number): string => {
      if (value < 580) {
        return 'Poor: ' + value;
      }
      if (value < 670) {
        return 'Fair: ' + value;
      }
      if (value < 740) {
        return 'Good: ' + value;
      }
      if (value < 780) {
        return 'Very Good: ' + value;
      }
      return 'Exceptional: ' + value;
    },
    // showSelectionBar: true,
    getTickColor: (value: number): string => {
      if (value < 580) {
        return 'red';
      }
      if (value < 670) {
        return 'orange';
      }
      if (value < 740) {
        return 'yellow';
      }
      return '#2AE02A';
    }  };

  constructor(private nav: NavigationManagerService, private cp: CurrencyPipe, private data: DataService) { }

  ngOnInit() {
    this.resetDownOptions();
    this.calculatePurchasingPower();
  }

  back() {
    this.nav.back('home');
  }

  installmentAmountChanged() {
    this.resetDownOptions();
    this.data.vehicles = null;
    this.calculatePurchasingPower();
  }

  resetDownOptions() {
    if (!this.model.downChanged) {
      this.model.downPayment = Math.min(this.model.monthlyPayment * 2, 1000);
    }
    this.downOptions = {
      floor: 0,
      ceil: 2000,
      step: 10,
      translate: (value: number): string => {
        return this.cp.transform(value);
      }
    };
  }

  downPaymentChanged() {
    // do something
    this.model.downChanged = true;
    this.data.vehicles = null;
    this.calculatePurchasingPower();
  }

  loanLengthChanged() {
    // do something
    this.data.vehicles = null;
    this.calculatePurchasingPower();
  }

  periodChanged() {
    this.data.vehicles = null;
    this.calculatePurchasingPower();
  }

  creditScoreChanged() {
    // do something
    this.data.vehicles = null;
    this.calculatePurchasingPower();
  }

  calculatePurchasingPower() {
    this.data.calculatePurchasingPower();

    this.data.updateSession();
  }
  continue(selectedPeriod: number) {

    this.model.selectedPeriod = selectedPeriod;

    this.nav.forward(['vehicle-search']);

    /* this would link back to eWald's inventory page filled in.
    document.location.href = 'https://www.ewaldkia.com/vehicle-inventory.php?' +
    'dealer=2&sort_certified=201&sort_year=2000&sort_to_year=10000' +
    '&sort_make=Kia&sort_model=&sort_trim=&sort_cab=&sort_bed=' +
    '&sort_exterior=&sort_mileage=&sort_to_mileage=&sort_price=1&sort_to_price=' +
    this.model.periodicPurchaseAmount + '&sort_style=&sort_drivetrain=' +
    '&sort_transmission=&sort_fueltype=&sort_city=&sort_highway=&sort_sortby=4&keyword_search=&returny=0';
    */
  }
}
