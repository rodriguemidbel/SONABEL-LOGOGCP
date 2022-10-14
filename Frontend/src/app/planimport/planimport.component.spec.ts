import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanimportComponent } from './planimport.component';

describe('PlanimportComponent', () => {
  let component: PlanimportComponent;
  let fixture: ComponentFixture<PlanimportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanimportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
