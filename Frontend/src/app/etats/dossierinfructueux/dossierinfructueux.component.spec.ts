import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierinfructueuxComponent } from './dossierinfructueux.component';

describe('DossierinfructueuxComponent', () => {
  let component: DossierinfructueuxComponent;
  let fixture: ComponentFixture<DossierinfructueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierinfructueuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierinfructueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
