import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivitdossierComponent } from './suivitdossier.component';

describe('SuivitdossierComponent', () => {
  let component: SuivitdossierComponent;
  let fixture: ComponentFixture<SuivitdossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivitdossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivitdossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
