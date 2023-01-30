import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementDossierComponent } from './paiement-dossier.component';

describe('PaiementDossierComponent', () => {
  let component: PaiementDossierComponent;
  let fixture: ComponentFixture<PaiementDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
