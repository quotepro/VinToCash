import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { SellComponent } from './sell.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    /*{ path: '', redirectTo: '/home', pathMatch: 'full' },*/
    { path: '', component: SellComponent, data: { title: extract('Home') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SellRoutingModule { }
