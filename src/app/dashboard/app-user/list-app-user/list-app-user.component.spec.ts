import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppUserComponent } from './list-app-user.component';

describe('ListAppUserComponent', () => {
  let component: ListAppUserComponent;
  let fixture: ComponentFixture<ListAppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
