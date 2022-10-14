import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DospieceComponent } from './dospiece.component';

describe('DospieceComponent', () => {
  let component: DospieceComponent;
  let fixture: ComponentFixture<DospieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DospieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DospieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
