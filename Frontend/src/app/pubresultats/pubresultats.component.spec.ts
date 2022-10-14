import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubresultatsComponent } from './pubresultats.component';

describe('PubresultatsComponent', () => {
  let component: PubresultatsComponent;
  let fixture: ComponentFixture<PubresultatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubresultatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubresultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
