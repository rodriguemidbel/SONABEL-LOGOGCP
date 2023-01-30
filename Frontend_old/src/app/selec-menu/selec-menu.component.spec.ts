import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecMenuComponent } from './selec-menu.component';

describe('SelecMenuComponent', () => {
  let component: SelecMenuComponent;
  let fixture: ComponentFixture<SelecMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
