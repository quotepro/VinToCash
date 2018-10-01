import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EllipsisPipe } from '@app/ellipsis.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent, EllipsisPipe
  ],
  exports: [
    LoaderComponent,
    EllipsisPipe
  ]
})
export class SharedModule { }
