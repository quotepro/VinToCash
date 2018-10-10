import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-calculator',
  templateUrl: './payment-calculator.component.html',
  styleUrls: ['./payment-calculator.component.scss']
})
export class PaymentCalculatorComponent implements OnInit {

  model = {
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 7,
    prepaid: 0,
    extraAmount: 0
  };

  constructor() { }

  ngOnInit() {
  }

}
