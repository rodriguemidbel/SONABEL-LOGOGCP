import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierppmComponent } from './dossierppm.component';

describe('DossierppmComponent', () => {
  let component: DossierppmComponent;
  let fixture: ComponentFixture<DossierppmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierppmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierppmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
