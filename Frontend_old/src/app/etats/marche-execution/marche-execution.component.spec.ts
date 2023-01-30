import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheExecutionComponent } from './marche-execution.component';

describe('MarcheExecutionComponent', () => {
  let component: MarcheExecutionComponent;
  let fixture: ComponentFixture<MarcheExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcheExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcheExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
