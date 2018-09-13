import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { isVariableDeclaration } from 'babel-types';
import { DataSession } from '@app/model/data-session';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
  }

  get model(): DataSession {
    return this.data.session;
  }
  lookup() {
    if (this.data.isValid('vinLookup')) {
      this.data.geoCode();
      this.data.postData('Home', 'Prefill', this.model).subscribe(response => {
        if (response.nextUrl && response.nextUrl.indexOf('Location') > -1) {
          this.data.postData('Vehicle', 'VinLookup', this.model).subscribe(vehicle => {
            this.model.actualValue = vehicle.actualValue;
          });
        }
      });
    }
  }
  back() {
    this.data.session.actualValue = null;
    this.data.updateSession();
  }
  continue() {
    this.router.navigate(['photos']);
  }
}
