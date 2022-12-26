import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTalentComponent } from './detail-talent.component';

describe('DetailTalentComponent', () => {
  let component: DetailTalentComponent;
  let fixture: ComponentFixture<DetailTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
