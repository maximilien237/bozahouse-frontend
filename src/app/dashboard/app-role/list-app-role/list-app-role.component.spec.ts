import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppRoleComponent } from './list-app-role.component';

describe('ListAppRoleComponent', () => {
  let component: ListAppRoleComponent;
  let fixture: ComponentFixture<ListAppRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
