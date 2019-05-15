import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PaymentPanelComponent } from '@app/payment-panel/payment-panel.component';
import { EllipsisPipe } from '@app/ellipsis.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { MatchHeightDirective } from '@app/shared/match-height.directive';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    })
  ],
  declarations: [
    LoaderComponent,
    PaymentPanelComponent,
    EllipsisPipe,
    MatchHeightDirective
  ],
  exports: [
    LoaderComponent,
    PaymentPanelComponent,
    EllipsisPipe,
    TextMaskModule,
    MatchHeightDirective
  ]
})
export class SharedModule { }
