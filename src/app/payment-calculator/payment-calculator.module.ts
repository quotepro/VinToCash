import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@app/shared';
import { PaymentCalculatorRoutingModule } from './payment-calculator-routing.module';
import { PaymentCalculatorComponent } from './payment-calculator.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    Angulartics2Module,
    PaymentCalculatorRoutingModule,
    FormsModule,
    Ng5SliderModule,
    NgbPopoverModule
  ],
  declarations: [PaymentCalculatorComponent]
})
export class PaymentCalculatorModule { }
