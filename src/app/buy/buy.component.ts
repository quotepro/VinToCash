import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { CurrencyPipe } from '@angular/common';
import { Payment } from '@app/model/payment';
import { Calculator } from '@app/model/calculator';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  model: Calculator = new Calculator({
    purchaseAmount: 0,
    downPayment: 200,
    loanAmount: 9000,
    loanLength: 6,
    creditScore: 600,
    period: 2,
    installmentAmount: 500,
    totalCost: 0,
    interestPaid: 0,
    installments: 0,
    periodicAmount: 0,
    totalPaid: 0,
    payment: 0
  });

  amortization: Array<Payment> = [];
  // source: https://www.valuepenguin.com/auto-loans/average-auto-loan-interest-rates as of 9/19/2018
  get interestRate(): number {
    if (this.model.creditScore > 780) {
      return .0360;
    }
    if (this.model.creditScore > 690) {
      return .0495;
    }
    if (this.model.creditScore > 660) {
      return .0700;
    }
    if (this.model.creditScore > 620) {
      return .0972;
    }
    if (this.model.creditScore > 590) {
      return .1406;
    }
    return .1525;
  }

  installmentOptions: Options = {
    floor: 50,
    ceil: 1000,
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
    floor: 3,
    ceil: 7,
    showTicks: true,
    translate: (value: number): string => {
      return value + ' years';
    }
  };

  periodOptions: Options = {
    floor: 1,
    ceil: 3,
    showTicks: true,
    translate: (value: number): string => {
      switch (value) {
        case 1:
          return 'Monthly';
        case 2:
          return 'Bi-Weekly';
        case 3:
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

  constructor(private router: Router, private cp: CurrencyPipe) { }

  ngOnInit() {
    this.resetDownOptions();
    this.calculateLoanAmount();
  }

  back() {
    this.router.navigate(['home']);
  }

  get installmentLabel() {
    switch (this.model.period) {
      case 1:
        return 'Monthly';
      case 2:
        return 'Bi-Weekly';
      case 3:
        return 'Weekly';
    }
  }

  installmentAmountChanged() {
    this.resetDownOptions();
    this.calculateLoanAmount();
  }

  resetDownOptions() {
    this.downOptions = {
      floor: 0,
      ceil: this.model.installmentAmount * 3,
      step: 10,
      translate: (value: number): string => {
        return this.cp.transform(value);
      }
    };
  }

  downPaymentChanged() {
    // do something
    this.calculateLoanAmount();
  }

  loanLengthChanged() {
    // do something
    this.calculateLoanAmount();
  }

  periodChanged() {
    this.calculateLoanAmount();
  }

  creditScoreChanged() {
    // do something
    this.calculateLoanAmount();
  }

  calculateLoanAmount() {
    let periods = 12;
    let interest = this.interestRate / periods;
    let payments = this.model.loanLength * periods;
    this.model.loanAmount = Math.round((this.model.installmentAmount *
      ((1 - Math.pow( 1 + interest, - payments)) / interest)) / 500) * 500;
    this.model.totalCost = this.model.installmentAmount * payments;
    this.model.totalInterest = this.model.totalCost - this.model.loanAmount;
    this.model.purchaseAmount = this.model.loanAmount + this.model.downPayment;

    periods = this.model.period === 2 ? 26 : 52;
    interest = this.interestRate / periods;
    payments = this.model.loanLength * periods;

    this.model.periodicAmount = this.model.installmentAmount / (this.model.period === 2 ? 2 : 4);
    const periodicLoanAmount = Math.round((this.model.periodicAmount *
      ((1 - Math.pow( 1 + interest, - payments)) / interest)) / 500) * 500;
    this.model.periodicPurchaseAmount = periodicLoanAmount + this.model.downPayment;
  }

  calculatePayment() {
    const principal = this.model.loanAmount;
    const periods = 12;
    const interest = this.interestRate / periods;
    const payments = this.model.loanLength * periods;

    // compute the monthly payment figure
    const x = Math.pow(1 + interest, payments); // Math.pow computes powers
    this.model.installmentAmount = Math.round((principal * x * interest) / (x - 1) * 100) / 100;
    this.model.totalCost = this.model.installmentAmount * payments;
    this.model.totalInterest = this.model.totalCost - this.model.loanAmount;

    this.amortizePayments();
  }

  amortizePayments() {
    // apply payments using semi-monthly payments.
    if (this.model.period > 1) {
      let periods = 12;
      let interest = this.interestRate / periods;
      periods = this.model.period === 1 ? 12 : this.model.period === 2 ? 26 : 52;
      this.model.payment = Math.round(this.model.installmentAmount * 100 / (this.model.period === 2 ? 2 : 4)) / 100;
      interest = this.interestRate / periods;
      let balance = this.model.loanAmount;
      this.amortization = [];
      this.model.periodicAmount = this.model.payment;
      this.model.interestPaid = 0;
      this.model.installments = 0;
      this.model.totalPaid = 0;
      while (balance > 0 ) {
        const accrued = Math.round(balance * interest * 100) / 100;
        const currBal = balance;
        balance = balance + accrued - this.model.payment;
        const nextPayment = new Payment({
          balance: currBal,
          interest: accrued,
          principle: balance > 0 ? this.model.payment - accrued : currBal,
          amount: balance > 0 ? this.model.payment : currBal + accrued
        });
        this.model.interestPaid += nextPayment.interest;
        this.model.installments++;
        this.model.totalPaid += nextPayment.amount;
        this.amortization.push(nextPayment);
      }
      console.log(this.amortization);
    }
  }
  continue() {

  }
}
