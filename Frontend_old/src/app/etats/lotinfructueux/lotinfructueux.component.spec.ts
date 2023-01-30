import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotinfructueuxComponent } from './lotinfructueux.component';

describe('LotinfructueuxComponent', () => {
  let component: LotinfructueuxComponent;
  let fixture: ComponentFixture<LotinfructueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotinfructueuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotinfructueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
