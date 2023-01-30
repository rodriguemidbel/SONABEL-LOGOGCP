import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypcreditComponent } from './typcredit.component';

describe('TypcreditComponent', () => {
  let component: TypcreditComponent;
  let fixture: ComponentFixture<TypcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypcreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
