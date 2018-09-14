import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { Dealer } from '@app/model/dealer';
import { NearbyDealer } from '@app/model/nearby-dealer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  get closestDealers(): Array<NearbyDealer> {
    return this.data.getNearbyDealers(10);
  }

  toAddress(location: string) {
    return location.replace(/^(.*)\s([^\s]*\s[^\s]*\s[^\s]*)$/, '$1<br/>$2');
  }

  back() {
    this.router.navigate(['photos']);
  }
}
