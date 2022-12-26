import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDatesComponent } from './user-dates.component';

describe('UserDatesComponent', () => {
  let component: UserDatesComponent;
  let fixture: ComponentFixture<UserDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
