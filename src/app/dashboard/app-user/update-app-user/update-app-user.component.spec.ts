import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppUserComponent } from './update-app-user.component';

describe('UpdateAppUserComponent', () => {
  let component: UpdateAppUserComponent;
  let fixture: ComponentFixture<UpdateAppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
