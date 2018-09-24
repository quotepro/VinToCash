import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { VehicleSearchComponent } from './vehicle-search.component';

const routes: Routes = [
  { path: '', component: VehicleSearchComponent, data: { title: extract('Search') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class VehicleSearchRoutingModule { }
