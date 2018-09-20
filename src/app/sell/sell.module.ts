import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SellRoutingModule } from './sell-routing.module';
import { SellComponent } from './sell.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    Angulartics2Module,
    SellRoutingModule,
    FormsModule
  ],
  declarations: [
    SellComponent
  ],
  providers: [
  ]
})
export class HomeModule { }
