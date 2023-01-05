import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTalentDisabledComponent } from './list-talent-disabled.component';

describe('ListTalentDisabledComponent', () => {
  let component: ListTalentDisabledComponent;
  let fixture: ComponentFixture<ListTalentDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTalentDisabledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTalentDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
