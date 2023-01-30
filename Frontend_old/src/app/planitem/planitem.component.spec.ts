import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanitemComponent } from './planitem.component';

describe('PlanitemComponent', () => {
  let component: PlanitemComponent;
  let fixture: ComponentFixture<PlanitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
