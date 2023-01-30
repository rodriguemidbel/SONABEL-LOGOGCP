import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubavisComponent } from './pubavis.component';

describe('PubavisComponent', () => {
  let component: PubavisComponent;
  let fixture: ComponentFixture<PubavisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubavisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubavisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
