import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  get urls(): Array<string> {
    return this.data.photos;
  }
  detectFiles(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.data.updateSession();
        };
        reader.readAsDataURL(file);
      }
    }
  }
  remove(index: number) {
    this.urls.splice(index, 1);
    this.data.updateSession();
  }

  back() {
    this.updatePhotos();
    this.router.navigate(['home']);
  }
  continue() {
    this.updatePhotos();
    this.router.navigate(['dealers']);
  }

  updatePhotos() {
    this.data.updatePhotos();
  }
}

