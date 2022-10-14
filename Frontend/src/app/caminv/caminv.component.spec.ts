import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminvComponent } from './caminv.component';

describe('CaminvComponent', () => {
  let component: CaminvComponent;
  let fixture: ComponentFixture<CaminvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaminvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaminvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
