import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@app/shared';
import { BuyNowRoutingModule } from './buy-now-routing.module';
import { BuyNowComponent } from './buy-now.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    Angulartics2Module,
    BuyNowRoutingModule,
    FormsModule,
    Ng5SliderModule
  ],
  declarations: [BuyNowComponent]
})
export class BuyNowModule { }
