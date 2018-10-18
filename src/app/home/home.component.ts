import { Component, OnInit } from '@angular/core';
import { DataSession } from '@app/model/data-session';
import { DataService } from '@app/core/data.service';
import { environment } from '@env/environment.prod';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;

  constructor(private data: DataService, private nav: NavigationManagerService) { }

  ngOnInit() {
    this.isLoading = true;
  }

  get loading() {
    return this.data.loading;
  }
  get model(): DataSession {
    return this.data.session;
  }

  get dealerLogo() {
    return environment.dealerLogo;
  }
  buy() {
    this.nav.forward(['buy']);
  }
  sell() {
    if ( environment.sellingUrl) {
      this.nav.forward(['externalRedirect', {
        title: environment.sellingTitle,
        externalUrl: environment.sellingUrl,
        description: environment.sellingDesc
        }]);
        return;
    }
    this.nav.forward(['/sell']);
  }
  trade() {
    this.nav.forward(['trade-in']);
  }

}
