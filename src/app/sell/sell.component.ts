import { Component, OnInit } from '@angular/core';
import { DataSession } from '@app/model/data-session';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  isLoading: boolean;

  constructor(private data: DataService, private router: Router) { }

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
  back() {
    this.data.session.actualValue = null;
    this.data.updateSession();
  }
  continue() {
    this.router.navigate(['details']);
  }
}
