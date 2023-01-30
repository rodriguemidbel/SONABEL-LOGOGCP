import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDossierProcedureComponent } from './vente-dossier-procedure.component';

describe('VenteDossierProcedureComponent', () => {
  let component: VenteDossierProcedureComponent;
  let fixture: ComponentFixture<VenteDossierProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteDossierProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteDossierProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
