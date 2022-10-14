import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdresuspensionComponent } from './ordresuspension.component';

describe('OrdresuspensionComponent', () => {
  let component: OrdresuspensionComponent;
  let fixture: ComponentFixture<OrdresuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdresuspensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdresuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
