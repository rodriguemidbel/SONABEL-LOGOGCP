import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierModeComponent } from './dossier-mode.component';

describe('DossierModeComponent', () => {
  let component: DossierModeComponent;
  let fixture: ComponentFixture<DossierModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
