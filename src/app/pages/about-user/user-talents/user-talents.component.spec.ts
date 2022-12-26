import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTalentsComponent } from './user-talents.component';

describe('UserTalentsComponent', () => {
  let component: UserTalentsComponent;
  let fixture: ComponentFixture<UserTalentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTalentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTalentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
