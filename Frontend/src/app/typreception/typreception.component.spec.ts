import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypreceptionComponent } from './typreception.component';

describe('TypreceptionComponent', () => {
  let component: TypreceptionComponent;
  let fixture: ComponentFixture<TypreceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypreceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypreceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
