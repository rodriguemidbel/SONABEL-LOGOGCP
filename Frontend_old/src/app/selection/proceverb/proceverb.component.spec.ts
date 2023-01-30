import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceverbComponent } from './proceverb.component';

describe('ProceverbComponent', () => {
  let component: ProceverbComponent;
  let fixture: ComponentFixture<ProceverbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceverbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceverbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
