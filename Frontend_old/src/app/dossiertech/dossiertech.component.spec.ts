import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossiertechComponent } from './dossiertech.component';

describe('DossiertechComponent', () => {
  let component: DossiertechComponent;
  let fixture: ComponentFixture<DossiertechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossiertechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossiertechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
