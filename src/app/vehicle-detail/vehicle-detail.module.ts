import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@app/shared';
import { VehicleDetailRoutingModule } from './vehicle-detail-routing.module';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailPanelComponent } from './detail-panel/detail-panel.component';
import { ReservePanelComponent } from './reserve-panel/reserve-panel.component';
import { BuyNowPanelComponent } from './buy-now-panel/buy-now-panel.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    Angulartics2Module,
    VehicleDetailRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    VehicleDetailComponent,
    DetailPanelComponent,
    ReservePanelComponent,
    BuyNowPanelComponent
  ],
  providers: [
  ]
})
export class VehicleDetailModule { }
