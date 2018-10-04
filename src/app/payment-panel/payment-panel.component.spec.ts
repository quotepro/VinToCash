import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPanelComponent } from './payment-panel.component';

describe('PaymentPanelComponent', () => {
  let component: PaymentPanelComponent;
  let fixture: ComponentFixture<PaymentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
