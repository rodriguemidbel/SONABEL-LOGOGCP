import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentprocComponent } from './contentproc.component';

describe('ContentprocComponent', () => {
  let component: ContentprocComponent;
  let fixture: ComponentFixture<ContentprocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentprocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
