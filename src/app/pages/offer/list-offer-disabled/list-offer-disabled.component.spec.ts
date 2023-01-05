import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfferDisabledComponent } from './list-offer-disabled.component';

describe('ListOfferDisabledComponent', () => {
  let component: ListOfferDisabledComponent;
  let fixture: ComponentFixture<ListOfferDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfferDisabledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfferDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
