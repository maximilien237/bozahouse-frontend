import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestimonyComponent } from './update-testimony.component';

describe('UpdateTestimonyComponent', () => {
  let component: UpdateTestimonyComponent;
  let fixture: ComponentFixture<UpdateTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTestimonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
