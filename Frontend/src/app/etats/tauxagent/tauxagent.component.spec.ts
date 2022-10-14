import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxagentComponent } from './tauxagent.component';

describe('TauxagentComponent', () => {
  let component: TauxagentComponent;
  let fixture: ComponentFixture<TauxagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TauxagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
