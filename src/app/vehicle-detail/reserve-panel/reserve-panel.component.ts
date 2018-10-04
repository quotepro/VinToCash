import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChromaCar } from '@app/model/chroma-car';

@Component({
  selector: 'app-reserve-panel',
  templateUrl: './reserve-panel.component.html',
  styleUrls: ['./reserve-panel.component.scss']
})
export class ReservePanelComponent implements OnInit {

  model: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  };

  @Input() car: ChromaCar;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() reserve: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
