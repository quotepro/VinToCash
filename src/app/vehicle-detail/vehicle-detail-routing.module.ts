import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { VehicleDetailComponent } from './vehicle-detail.component';

const routes: Routes = [
  { path: '', component: VehicleDetailComponent, data: { title: extract('Search') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class VehicleDetailRoutingModule { }
