import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { DealersRoutingModule } from './dealers-routing.module';
import { DealersComponent } from './dealers.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DealersRoutingModule,
    Angulartics2Module
  ],
  declarations: [
    DealersComponent
  ]
})
export class DealersModule { }
