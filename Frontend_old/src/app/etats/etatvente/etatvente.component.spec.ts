import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatventeComponent } from './etatvente.component';

describe('EtatventeComponent', () => {
  let component: EtatventeComponent;
  let fixture: ComponentFixture<EtatventeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatventeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
