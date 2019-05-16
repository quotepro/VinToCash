import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ActivatedRouteSnapshot } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ExternalRedirectComponent } from './external-redirect/external-redirect.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule', data: { page: 'about' } },
    { path: 'buy', loadChildren: 'app/buy/buy.module#BuyModule', data: { page: 'buy' } },
    { path: 'buy-now', loadChildren: 'app/buy-now/buy-now.module#BuyNowModule', data: { page: 'buy-now' } },
    { path: 'checkout', loadChildren: 'app/checkout/checkout.module#CheckoutModule', data: { page: 'checkout' } },
    { path: 'dealers', loadChildren: 'app/dealers/dealers.module#DealersModule', data: { page: 'dealers' } },
    { path: 'details', loadChildren: 'app/details/details.module#DetailsModule', data: { page: 'details' } },
    { path: 'photos', loadChildren: 'app/photos/photos.module#PhotosModule', data: { page: 'photos' } },
    { path: 'sell', loadChildren: 'app/sell/sell.module#SellModule', data: { page: 'sell' } },
    { path: 'sold', loadChildren: 'app/sold/sold.module#SoldModule', data: { page: 'sold' } },
    { path: 'vehicle-search',
      loadChildren: 'app/vehicle-search/vehicle-search.module#VehicleSearchModule', data: { page: 'vehicle-search' } },
    { path: 'vehicle-detail',
    loadChildren: 'app/vehicle-detail/vehicle-detail.module#VehicleDetailModule', data: { page: 'vehicle-detail' } },
    { path: 'trade-in', loadChildren: 'app/trade-in/trade-in.module#TradeInModule', data: { page: 'trade-in' } },
    { path: 'payment-calculator',
      loadChildren: 'app/payment-calculator/payment-calculator.module#PaymentCalculatorModule',
      data: { page: 'payment-calculator' }
    },
    {
      path: 'externalRedirect',
      resolve: {
          url: externalUrlProvider,
      },
      // We need a component here because we cannot define the route otherwise
      component: ExternalRedirectComponent,
    },
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
  providers: [
    {
        provide: externalUrlProvider,
        useValue: (route: ActivatedRouteSnapshot) => {
            const externalUrl = route.paramMap.get('externalUrl');
            // window.open(externalUrl, '_self');
        },
    },
  ]
})
export class AppRoutingModule { }
