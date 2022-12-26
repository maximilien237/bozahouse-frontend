import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTalentComponent } from './update-talent.component';

describe('UpdateTalentComponent', () => {
  let component: UpdateTalentComponent;
  let fixture: ComponentFixture<UpdateTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
