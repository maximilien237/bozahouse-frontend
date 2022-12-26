import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAppUserComponent } from './detail-app-user.component';

describe('DetailAppUserComponent', () => {
  let component: DetailAppUserComponent;
  let fixture: ComponentFixture<DetailAppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAppUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
