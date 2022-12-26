import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAppRoleComponent } from './detail-app-role.component';

describe('DetailAppRoleComponent', () => {
  let component: DetailAppRoleComponent;
  let fixture: ComponentFixture<DetailAppRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAppRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAppRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
