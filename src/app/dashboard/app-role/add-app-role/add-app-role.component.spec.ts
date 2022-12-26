import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppRoleComponent } from './add-app-role.component';

describe('AddAppRoleComponent', () => {
  let component: AddAppRoleComponent;
  let fixture: ComponentFixture<AddAppRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
