import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationManagerService } from '@app/core/navigation-manager.service';
import { Crumb } from '@app/model/crumb';
import { trigger, transition, group, query, style, animate, animateChild } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { RouterAnimations } from '@app/router.animations';

@Component({
  selector: 'app-shell',
  animations: [
    RouterAnimations.routeSlide
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(private nav: NavigationManagerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() { }

  getAnimationParameters(outlet: RouterOutlet) {
    const page = outlet.activatedRouteData['page'] || 'home';

    return this.nav.getAnimationParameters(page);
  }

  animationFinished(outlet: RouterOutlet) {
    [50, 1000, 2000, 3000]
      .forEach(timeout => setTimeout(() => window.dispatchEvent(new Event('resize')), timeout));
    this.cdRef.markForCheck();
  }

  get offsetEnter() {
    return '-100%';
  }

  get offsetLeave() {
    return '-100%';
  }

}
