import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@app/shared';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    Angulartics2Module,
    CheckoutRoutingModule,
    FormsModule,
    Ng5SliderModule,
    NgbPopoverModule,
    NgCircleProgressModule.forRoot()
  ],
  declarations: [CheckoutComponent]
})
export class CheckoutModule { }
