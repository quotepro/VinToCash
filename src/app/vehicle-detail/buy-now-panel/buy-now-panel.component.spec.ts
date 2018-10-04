import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowPanelComponent } from './buy-now-panel.component';

describe('BuyNowPanelComponent', () => {
  let component: BuyNowPanelComponent;
  let fixture: ComponentFixture<BuyNowPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNowPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
