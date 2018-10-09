import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@app/shared';
import { TradeInRoutingModule } from './trade-in-routing.module';
import { TradeInComponent } from './trade-in.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    Angulartics2Module,
    TradeInRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [
    TradeInComponent
  ],
  providers: [
  ]
})
export class TradeInModule { }
