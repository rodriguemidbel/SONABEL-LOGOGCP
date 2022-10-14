import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScamrapportComponent } from './scamrapport.component';

describe('ScamrapportComponent', () => {
  let component: ScamrapportComponent;
  let fixture: ComponentFixture<ScamrapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScamrapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScamrapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
