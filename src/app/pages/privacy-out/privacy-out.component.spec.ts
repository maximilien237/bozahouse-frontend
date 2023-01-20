import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyOutComponent } from './privacy-out.component';

describe('PrivacyOutComponent', () => {
  let component: PrivacyOutComponent;
  let fixture: ComponentFixture<PrivacyOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
