import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierAgentComponent } from './dossier-agent.component';

describe('DossierAgentComponent', () => {
  let component: DossierAgentComponent;
  let fixture: ComponentFixture<DossierAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
