import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaminvComponent } from './scaminv.component';

describe('ScaminvComponent', () => {
  let component: ScaminvComponent;
  let fixture: ComponentFixture<ScaminvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaminvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaminvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
