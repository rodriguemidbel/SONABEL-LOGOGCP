import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionMarcheComponent } from './execution-marche.component';

describe('ExecutionMarcheComponent', () => {
  let component: ExecutionMarcheComponent;
  let fixture: ComponentFixture<ExecutionMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionMarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
