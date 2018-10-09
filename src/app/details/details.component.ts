import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';
import { NavigationManagerService } from '@app/core/navigation-manager.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private data: DataService, private nav: NavigationManagerService) { }

  ngOnInit() {
  }

  get model() {
    return this.data.session;
  }
  back() {
    this.nav.back('home');
    this.data.updateSession();
  }
  continue() {
    this.nav.forward(['photos']);
    this.data.updateSession();
  }

  get quote(): string {
    return 'quote';
  }
}
