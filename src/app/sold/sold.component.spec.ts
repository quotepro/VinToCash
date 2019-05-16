import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldComponent } from './sold.component';

describe('CheckoutComponent', () => {
  let component: SoldComponent;
  let fixture: ComponentFixture<SoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
