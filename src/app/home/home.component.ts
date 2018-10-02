import { Component, OnInit } from '@angular/core';
import { DataSession } from '@app/model/data-session';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  get dealerLogo() {
    return environment.dealerLogo;
  }
  buy() {
    this.router.navigate(['buy']);
  }
  sell() {
    this.router.navigate(['sell']);
  }
  trade() {
    this.router.navigate(['trade']);
  }

}
