import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppUserDisabledComponent } from './list-app-user-disabled.component';

describe('ListAppUserDisabledComponent', () => {
  let component: ListAppUserDisabledComponent;
  let fixture: ComponentFixture<ListAppUserDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppUserDisabledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAppUserDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
