import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@app/shared';
import { VehicleSearchRoutingModule } from './vehicle-search-routing.module';
import { VehicleSearchComponent } from './vehicle-search.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    Angulartics2Module,
    VehicleSearchRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [
    VehicleSearchComponent
  ],
  providers: [
  ]
})
export class VehicleSearchModule { }
