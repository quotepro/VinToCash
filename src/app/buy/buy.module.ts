import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@app/shared';
import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    Angulartics2Module,
    BuyRoutingModule,
    FormsModule,
    Ng5SliderModule
  ],
  declarations: [BuyComponent]
})
export class BuyModule { }
