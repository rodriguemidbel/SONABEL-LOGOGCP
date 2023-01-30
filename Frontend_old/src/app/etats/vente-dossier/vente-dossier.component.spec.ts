import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDossierComponent } from './vente-dossier.component';

describe('VenteDossierComponent', () => {
  let component: VenteDossierComponent;
  let fixture: ComponentFixture<VenteDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
