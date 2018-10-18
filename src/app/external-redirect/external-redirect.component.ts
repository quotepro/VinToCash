import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-external-redirect',
  templateUrl: './external-redirect.component.html',
  styleUrls: ['./external-redirect.component.scss']
})
export class ExternalRedirectComponent implements OnInit, OnDestroy {

  externalUrl: string;
  description: string;
  title: string;
  timer: any;

  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.paramMap.get('title');
    this.externalUrl = this.route.snapshot.paramMap.get('externalUrl');
    this.description = this.route.snapshot.paramMap.get('description');
  }

  ngOnInit() {
    let timeout = 1;
    const url = this.externalUrl;
    if (this.description) {
      timeout = 30000;
    }
    this.timer = setTimeout(function() {
      document.location.replace(url);
    }, timeout);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }


}
