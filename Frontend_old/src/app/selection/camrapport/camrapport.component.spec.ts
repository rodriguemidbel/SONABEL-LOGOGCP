import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamrapportComponent } from './camrapport.component';

describe('CamrapportComponent', () => {
  let component: CamrapportComponent;
  let fixture: ComponentFixture<CamrapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamrapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamrapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
