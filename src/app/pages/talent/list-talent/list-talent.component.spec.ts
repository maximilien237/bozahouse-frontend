import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTalentComponent } from './list-talent.component';

describe('ListTalentComponent', () => {
  let component: ListTalentComponent;
  let fixture: ComponentFixture<ListTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
