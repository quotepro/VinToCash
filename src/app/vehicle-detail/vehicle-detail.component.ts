import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  readMore: boolean;

  get readLess(): boolean {
    return !this.readMore;
  }
  set readLess(value: boolean) {
    this.readMore = !value;
  }

  selectedImage: string;
  get car() {
    return this.data.session.selectedVehicle;
  }

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    if (this.car.imageList.length > 0) {
      this.selectedImage = this.car.imageList[0];
    }
  }

  get vehicleDescription() {
    const description = this.car.descriptions.replace(/([A-Z' ]+:)/g, '<br/><br/>$1');

    return description;
  }
  back() {
    this.router.navigate(['vehicle-search']);
  }

  readMoreClicked() {
    this.readMore = true;
    return false;
  }
  readLessClicked() {
    this.readLess = true;
    return false;
  }
}
