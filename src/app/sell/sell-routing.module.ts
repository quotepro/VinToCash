import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { SellComponent } from './sell.component';

const routes: Routes = [
  { path: '', component: SellComponent, data: { title: extract('Sell') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SellRoutingModule { }
