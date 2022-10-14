import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteAddComponent } from './vente-add.component';

describe('VenteAddComponent', () => {
  let component: VenteAddComponent;
  let fixture: ComponentFixture<VenteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
