import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanitemexeComponent } from './planitemexe.component';

describe('PlanitemexeComponent', () => {
  let component: PlanitemexeComponent;
  let fixture: ComponentFixture<PlanitemexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanitemexeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanitemexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
