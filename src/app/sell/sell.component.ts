import { Component, OnInit } from '@angular/core';
import { DataSession } from '@app/model/data-session';
import { DataService } from '@app/core/data.service';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

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
  lookup() {
    this.data.lookupVehicle();
  }
  clear() {
    this.data.session.actualValue = null;
    this.data.updateSession();
  }
  back() {
    this.nav.back('home');
  }
  continue() {
    this.nav.forward(['details']);
  }
}
