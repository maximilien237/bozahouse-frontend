import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppRoleComponent } from './update-app-role.component';

describe('UpdateAppRoleComponent', () => {
  let component: UpdateAppRoleComponent;
  let fixture: ComponentFixture<UpdateAppRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
