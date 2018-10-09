import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { TradeInComponent } from './trade-in.component';

const routes: Routes = [
  { path: '', component: TradeInComponent, data: { title: extract('Trade-In') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TradeInRoutingModule { }
