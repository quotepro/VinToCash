import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PhotosRoutingModule,
    Angulartics2Module
  ],
  declarations: [
    PhotosComponent
  ]
})
export class PhotosModule { }
