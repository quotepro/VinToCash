import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { Dealer } from '@app/model/dealer';
import { NearbyDealer } from '@app/model/nearby-dealer';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  get closestDealers(): Array<NearbyDealer> {
    return this.data.getNearbyDealers(10);
  }
}
