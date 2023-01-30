import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderprocComponent } from './headerproc.component';

describe('HeaderprocComponent', () => {
  let component: HeaderprocComponent;
  let fixture: ComponentFixture<HeaderprocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderprocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
