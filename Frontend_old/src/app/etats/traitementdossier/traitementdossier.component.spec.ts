import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementdossierComponent } from './traitementdossier.component';

describe('TraitementdossierComponent', () => {
  let component: TraitementdossierComponent;
  let fixture: ComponentFixture<TraitementdossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitementdossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementdossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
