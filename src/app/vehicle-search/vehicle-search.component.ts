import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '@app/core/data.service';
import { ChromaCar } from '@app/model/chroma-car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit {

  page: 0;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getInventory();
  }

  get model() {
    return this.data.session;
  }

  get vehicleList(): ChromaCar[] {
    return this.data.vehicles;
  }

  back() {
    this.router.navigate(['buy']);
  }
  search() {
    this.data.updateSession();
    this.data.getInventory();
  }
  clearFilter() {
    this.model.filter = '';
    this.search();
  }
}
