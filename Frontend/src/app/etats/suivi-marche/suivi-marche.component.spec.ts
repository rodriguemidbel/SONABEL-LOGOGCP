import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviMarcheComponent } from './suivi-marche.component';

describe('SuiviMarcheComponent', () => {
  let component: SuiviMarcheComponent;
  let fixture: ComponentFixture<SuiviMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviMarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
