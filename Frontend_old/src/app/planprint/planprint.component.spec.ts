import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanprintComponent } from './planprint.component';

describe('PlanprintComponent', () => {
  let component: PlanprintComponent;
  let fixture: ComponentFixture<PlanprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
