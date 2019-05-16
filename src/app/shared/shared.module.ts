import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PaymentPanelComponent } from '@app/payment-panel/payment-panel.component';
import { EllipsisPipe } from '@app/ellipsis.pipe';
import { MatchHeightDirective } from '@app/shared/match-height.directive';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxMaskModule, MaskDirective } from 'ngx-mask';
import { ClickIfValidDirective } from './click-if-valid.directive';

@NgModule({
  imports: [
    CommonModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    LoaderComponent,
    PaymentPanelComponent,
    EllipsisPipe,
    MatchHeightDirective,
    ClickIfValidDirective
  ],
  exports: [
    LoaderComponent,
    PaymentPanelComponent,
    EllipsisPipe,
    MatchHeightDirective,
    MaskDirective,
    ClickIfValidDirective
  ]
})
export class SharedModule { }
