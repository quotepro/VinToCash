import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { Dealer } from '@app/model/dealer';
import { NearbyDealer } from '@app/model/nearby-dealer';
import { Router } from '@angular/router';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit {

  constructor(private data: DataService, private nav: NavigationManagerService) { }

  ngOnInit() {
  }

  get closestDealers(): Array<NearbyDealer> {
    return this.data.getNearbyDealers(10);
  }

  get home(): string {
    return 'home';
  }

  toAddress(location: string) {
    return location.replace(/^(.*)\s([^\s]*\s[^\s]*\s[^\s]*)$/, '$1<br/>$2');
  }

  back() {
    this.nav.back('photos');
  }
}
