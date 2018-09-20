import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  get model() {
    return this.data.session;
  }
  back() {
    this.router.navigate(['home']);
    this.data.updateSession();
  }
  continue() {
    this.router.navigate(['photos']);
    this.data.updateSession();
  }

  get quote(): string {
    return 'quote';
  }
}
