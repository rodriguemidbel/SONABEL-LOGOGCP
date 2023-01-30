import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxdetailsComponent } from './tauxdetails.component';

describe('TauxdetailsComponent', () => {
  let component: TauxdetailsComponent;
  let fixture: ComponentFixture<TauxdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TauxdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
