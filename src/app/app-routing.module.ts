import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
    { path: 'buy', loadChildren: 'app/buy/buy.module#BuyModule' },
    { path: 'buy-now', loadChildren: 'app/buy-now/buy-now.module#BuyNowModule' },
    { path: 'dealers', loadChildren: 'app/dealers/dealers.module#DealersModule' },
    { path: 'details', loadChildren: 'app/details/details.module#DetailsModule' },
    { path: 'photos', loadChildren: 'app/photos/photos.module#PhotosModule' },
    { path: 'sell', loadChildren: 'app/sell/sell.module#SellModule' },
    { path: 'vehicle-search', loadChildren: 'app/vehicle-search/vehicle-search.module#VehicleSearchModule' },
    { path: 'vehicle-detail', loadChildren: 'app/vehicle-detail/vehicle-detail.module#VehicleDetailModule' },
    { path: 'trade-in', loadChildren: 'app/trade-in/trade-in.module#TradeInModule' },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
