import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[clickIfValid]'
})
export class ClickIfValidDirective {

  @Output('clickIfValid') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename

  constructor(private formRef: NgForm) {
    console.log(this.formRef);
  }

  @HostListener('click')
  handleClick() {
    this.markFieldsAsTouched();
    this.emitIfValid();
  }

  private markFieldsAsTouched() {
    Object.keys(this.formRef.controls)
      .forEach(fieldName =>
        this.formRef.controls[fieldName].markAsTouched()
      );
  }

  private emitIfValid() {
    if (this.formRef.valid) {
      this.valid.emit();
    }
  }
}
