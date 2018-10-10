import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss']
})
export class DetailPanelComponent implements OnInit {
  readMore: boolean;
  get readLess(): boolean {
    return !this.readMore;
  }
  set readLess(value: boolean) {
    this.readMore = !value;
  }

  @Input() car: ChromaCar;

  constructor() { }

  ngOnInit() {
    // console.log(this.car);
  }

  readMoreClicked() {
    this.readMore = true;
    return false;
  }
  readLessClicked() {
    this.readLess = true;
    return false;
  }
  get vehicleDescription() {
    const description = this.car.descriptions.replace(/([A-Z' ]+:)/g, '<br/><br/>$1');
    return description;
  }

}
