import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvouvertureComponent } from './pvouverture.component';

describe('PvouvertureComponent', () => {
  let component: PvouvertureComponent;
  let fixture: ComponentFixture<PvouvertureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PvouvertureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PvouvertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
