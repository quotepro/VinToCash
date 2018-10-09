import { Component, OnInit } from '@angular/core';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-trade-in',
  templateUrl: './trade-in.component.html',
  styleUrls: ['./trade-in.component.scss']
})
export class TradeInComponent implements OnInit {

  constructor(private nav: NavigationManagerService) { }

  ngOnInit() {
  }

  back() {
    this.nav.back(undefined);
  }
}
