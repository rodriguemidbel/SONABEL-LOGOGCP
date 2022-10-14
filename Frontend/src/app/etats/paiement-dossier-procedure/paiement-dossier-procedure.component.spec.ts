import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementDossierProcedureComponent } from './paiement-dossier-procedure.component';

describe('PaiementDossierProcedureComponent', () => {
  let component: PaiementDossierProcedureComponent;
  let fixture: ComponentFixture<PaiementDossierProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementDossierProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementDossierProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
