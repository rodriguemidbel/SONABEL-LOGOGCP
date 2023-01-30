import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxglobalComponent } from './tauxglobal.component';

describe('TauxglobalComponent', () => {
  let component: TauxglobalComponent;
  let fixture: ComponentFixture<TauxglobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TauxglobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxglobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
