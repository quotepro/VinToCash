import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Crumb } from '@app/model/crumb';

@Injectable({
  providedIn: 'root'
})
export class NavigationManagerService {

  breadcrumbs: Array<Crumb> = [];
  lastDirection: string;

  constructor(private router: Router) {
  }

  clear() {
    this.breadcrumbs = [];
  }

  forward(commands: any[], extras?: NavigationExtras) {
    this.lastDirection = 'forward';
    this.router.navigate(commands, extras);
  }

  goto(crumb: Crumb, i: number): any {
    this.lastDirection = 'goto';
    if (this.breadcrumbs.length > i) {
      const tail = this.breadcrumbs.splice(i, this.breadcrumbs.length - i);
      this.router.navigate([tail[0].url]);
    }
    return false;
  }

  back(targetUrl: string) {
    // navigate backward until hitting command url.
    this.lastDirection = 'back';
    let popped = null;
    if (targetUrl) {
      while (targetUrl && targetUrl !== popped && '/' + targetUrl !== popped) {
        if (this.breadcrumbs.length === 0) {
          break;
        }
        popped = this.breadcrumbs.pop().url;
      }
      this.router.navigate([targetUrl] );
      return false;
    }

    // remove the current page
    // console.log('Popped', this.breadcrumbs.pop().url);
    if (this.breadcrumbs.length > 0) {
      const previousRoute = this.breadcrumbs.pop();
      // console.log('Popped', previousRoute);
      this.router.navigate([previousRoute.url] );
    }
  }

  // this is called from app level route event listener.
  push(route: ActivatedRoute, title: string) {
    const url = route.snapshot['_routerState'].url;
    // console.log('Pushed', url);
    this.breadcrumbs.push(new Crumb({
      url: url,
      title: title
    }));
  }

  getAnimationParameters(page: any) {
    switch (this.lastDirection) {
      case 'goto':
      case 'back':
        return {
          value: page,
          params: {
            xEnter: -100,
            xLeave: 100,
            yEnter: 0,
            yLeave: 0
          }
        };
      case 'forward':
      default:
        return {
          value: page,
          params: {
            xEnter: 100,
            xLeave: -100,
            yEnter: 0,
            yLeave: 0
          }
        };
    }
  }

}
