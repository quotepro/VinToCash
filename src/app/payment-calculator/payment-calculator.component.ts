import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { PaymentCalculatorModel } from '@app/model/payment-calculator.model';
import { DataService } from '@app/core/data.service';
import { Payment } from '@app/model/payment';
import { CurrencyPipe } from '@angular/common';
import { NavigationManagerService } from '@app/core/navigation-manager.service';
import { Calculator } from '@app/model/calculator';

@Component({
  selector: 'app-payment-calculator',
  templateUrl: './payment-calculator.component.html',
  styleUrls: ['./payment-calculator.component.scss']
})
export class PaymentCalculatorComponent implements OnInit, OnChanges {

  get installmentLabel() {
    switch (this.model.period) {
      case '1':
        return 'Weekly';
      case '2':
        return 'Bi-weekly';
      case '3':
        return 'Monthly';
    }
  }

  get installmentPeriod() {
    return parseInt((this.model.period || 0).toString(), 10);
  }

  get monthlyTerm() {
    return this.amortizeMonths.map(pmt => pmt.payments).reduce( (a: number, b: number) => a + b);
  }

  get biWeeklyTerm() {
    return this.amortizeBiWeekly.map(pmt => pmt.payments).reduce( (a: number, b: number) => a + b) / 26 * 12;
  }
  get weeklyTerm() {
    return this.amortizeWeekly.map(pmt => pmt.payments).reduce( (a: number, b: number) => a + b) / 52 * 12;
  }

  get monthlyPayment() {
    return Math.round(
      this.data.calculatePaymentAmount(
        this.model.loanAmount, 3, this.model.loanTerm, this.model.interestRate / 100) * 100) / 100;
  }

  get biWeeklyPayment() {
    return this.data.calculatePaymentAmount(
      this.model.loanAmount, 2, this.model.loanTerm, this.model.interestRate / 100);
  }

  get weeklyPayment() {
    return this.data.calculatePaymentAmount(
      this.model.loanAmount, 1, this.model.loanTerm, this.model.interestRate / 100);
  }
  get installmentPayment() {
    let value = 0;
    switch (this.model.period) {
      case '1':
        value = this.weeklyPayment;
        break;
      case '2':
        value = this.biWeeklyPayment;
        break;
      case '3':
        value = this.monthlyPayment;
        break;
    }
    return this.currencyPipe.transform(value + parseFloat((this.model.extraAmount || 0).toString()));
  }

  get installmentInterest() {
    let value = 0;
    switch (this.model.period) {
      case '1':
        value = this.weeklyInterest;
        break;
      case '2':
        value = this.biWeeklyInterest;
        break;
      case '3':
        value = this.monthlyInterest;
        break;
    }
    return this.currencyPipe.transform(value);
  }

  get calc() {
    return this.data.getCalc();
  }
  get monthlyInterest() {
    return this.amortizeMonths.map(pmt => pmt.interest).reduce((a: number, b: number ) => a + b );
  }
  get biWeeklyInterest() {
    return this.amortizeBiWeekly.map(pmt => pmt.interest).reduce((a: number, b: number ) => a + b );
  }
  get weeklyInterest() {
    return this.amortizeWeekly.map(pmt => pmt.interest).reduce((a: number, b: number ) => a + b );
  }

  get monthlyPayoff() {
    const monthsLeft = this.monthlyTerm - parseInt((this.model.prepaid || 0).toString(), 10);
    const date = new Date();
    date.setMonth(date.getMonth() + monthsLeft);
    return date;
  }

  get biWeeklyPayoff() {
    const monthsLeft = this.biWeeklyTerm - parseInt((this.model.prepaid || 0).toString(), 10);
    const date = new Date();
    date.setMonth(date.getMonth() + monthsLeft);
    return date;
  }

  get weeklyPayoff() {
    const monthsLeft = this.weeklyTerm - parseInt((this.model.prepaid || 0).toString(), 10);
    const date = new Date();
    date.setMonth(date.getMonth() + monthsLeft);
    return date;
  }
  model: PaymentCalculatorModel = {
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 7,
    prepaid: 0,
    extraAmount: 0,
    loanPayment: 0,
    interestPaid: 0,
    period: '1',
    monthlyPayment: 0,
  };

  amortizeMonths: Array<Payment>;
  amortizeBiWeekly: Array<Payment>;
  amortizeWeekly: Array<Payment>;

  learning = false;

  constructor(
    private data: DataService,
    private currencyPipe: CurrencyPipe,
    private nav: NavigationManagerService
  ) { }

  getExtraPayment(period: number): number {
    if (this.installmentPeriod === period) {
      return parseFloat((this.model.extraAmount || 0).toString());
    }
    return 0;
  }

  ngOnInit() {
    if (!this.calc.monthlyPurchasePower) {
      this.data.calculatePurchasingPower();
    }
    this.model.loanAmount = this.calc.monthlyPurchasePower;
    this.model.monthlyPayment = this.monthlyPayment;
    this.model.interestRate = Math.round(this.data.getInterestRate() * 10000) / 100;
    this.model.loanTerm = this.calc.loanLength;
    this.model.period = '1';
    this.ngOnChanges(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      Object.keys(changes).forEach((key: string) => {
        console.log(key, changes[key]);
        if (key === 'model.monthlyPayment') {
          this.monthlyChanged();
        }
      });
    }
    this.amortizeMonths = this.amortize(12);
    this.amortizeBiWeekly = this.amortize(26);
    this.amortizeWeekly = this.amortize(52);
  }

  monthlyChanged() {
    const calc = new Calculator({
      monthlyPayment: this.model.monthlyPayment,
      loanLength: this.model.loanTerm,
      interestRate: this.model.interestRate / 100,
      downPayment: 0
    });

    this.data.calculatePurchasingPower(calc);
    this.model.loanAmount = calc.monthlyPurchasePower;
    this.ngOnChanges(null);
  }

  otherChanges() {
    // reset the monthly amount
    this.ngOnChanges(null);
    this.model.monthlyPayment = this.monthlyPayment;
  }
  fireChanges($event: Event) {
    if ($event.target['name'] === 'monthlyPayment') {
      this.monthlyChanged();
    } else {
      this.otherChanges();
    }
  }

  amortize(periods: number, prepaid?: number): Array<Payment> {
    console.log('amortize: ', periods, prepaid);
    let payment = 0;
    switch (periods) {
      case 12:
        payment = this.monthlyPayment;
        break;
      case 26:
        payment = this.biWeeklyPayment;
        break;
      case 52:
        payment = this.weeklyPayment;
        break;
    }

    // payment = Math.round(payment * 100) / 100;
    if (!prepaid) {
      if (this.installmentPeriod === 1 && periods === 52) {
        payment += parseFloat((this.model.extraAmount || 0).toString());
      }
      if (this.installmentPeriod === 2 && periods === 26) {
        payment += parseFloat((this.model.extraAmount || 0).toString());
      }
      if (this.installmentPeriod === 3 && periods === 12) {
        payment += parseFloat((this.model.extraAmount || 0).toString());
      }
    }
    let balance = parseFloat(this.model.loanAmount.toString());
    const periodicRate = this.model.interestRate / 100 / periods;
    let period = 0;
    let annual: Payment;
    let amortization = new Array<Payment>();
    if (!prepaid && this.model.prepaid) {
      amortization = this.amortize(12, this.model.prepaid);
      if (amortization && amortization.length > 0) {
        annual = amortization[amortization.length - 1];
        balance = annual.balance - annual.principle;
        amortization.forEach(pmt => {
          pmt.payments = pmt.payments / 12 * periods; // convert to number of annual periods
        });
        period = Math.round(this.model.prepaid / 12 * periods);
      } else {
        amortization = new Array<Payment>();
      }
    }
    while (balance > 0) {
      // tslint:disable-next-line:triple-equals -- we want the auto-conversion here.
      if (prepaid && period == prepaid) {
        break;
      }
      if (period % periods === 0) {
        amortization.push(annual = new Payment({
          balance: balance,
          principle: 0,
          interest: 0,
          amount: 0
        }));
      }
      const interest = Math.round(balance * periodicRate * 100) / 100;
      balance += interest - payment;
      annual.amount += payment;
      annual.principle += payment - interest;
      annual.interest += interest;
      annual.payments++;
      period++;
    }
    if (balance < 0) {
      annual.principle += balance;
      annual.amount += balance;
    }
    return amortization;
  }

  continue(selectedPeriod: number) {

    this.calc.selectedPeriod = selectedPeriod;

    this.nav.forward(['vehicle-search']);
  }

  back() {
    this.nav.back('buy');
  }

}
