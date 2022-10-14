import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcselectionComponent } from './procselection.component';

describe('ProcselectionComponent', () => {
  let component: ProcselectionComponent;
  let fixture: ComponentFixture<ProcselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcselectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
