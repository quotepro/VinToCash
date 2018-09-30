import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  @Input() car: ChromaCar;
  @Output() closed: EventEmitter<any> = new EventEmitter();

  selectedImage: string;

  constructor() { }

  ngOnInit() {
    if (this.car.imageList.length > 0) {
      this.selectedImage = this.car.imageList[0];
    }
  }

  close() {
    this.closed.emit(null);
  }
}
