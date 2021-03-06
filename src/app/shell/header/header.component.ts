import { Component, OnInit } from '@angular/core';

import { I18nService } from '@app/core';
import { environment } from '@env/environment.prod';
import { NavigationManagerService } from '@app/core/navigation-manager.service';
import { Crumb } from '@app/model/crumb';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  logoExists = true;

  get imageUrl() {
    const assets = '/assets/';
    if (environment.dealerLogo || environment.dealerCode) {
      return assets + environment.dealerLogo || (environment.dealerCode + '-logo.png');
    }
    return assets + document.location.hostname.split('.')[0] + '-logo.png';
  }

  constructor(
    private i18nService: I18nService,
    private nav: NavigationManagerService) { }

  ngOnInit() { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
  get breadcrumbs() {
    return this.nav.breadcrumbs;
  }

  navigate(crumb: Crumb, i: number) {
    return this.nav.goto(crumb, i);
  }

}
