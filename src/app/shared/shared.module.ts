import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PaymentPanelComponent } from '@app/payment-panel/payment-panel.component';
import { EllipsisPipe } from '@app/ellipsis.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    PaymentPanelComponent,
    EllipsisPipe
  ],
  exports: [
    LoaderComponent,
    PaymentPanelComponent,
    EllipsisPipe
  ]
})
export class SharedModule { }
