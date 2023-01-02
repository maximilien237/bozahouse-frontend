import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestimoniesComponent } from './user-testimonies.component';

describe('UserTestimoniesComponent', () => {
  let component: UserTestimoniesComponent;
  let fixture: ComponentFixture<UserTestimoniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTestimoniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTestimoniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
