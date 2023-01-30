import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdrerepriseComponent } from './ordrereprise.component';

describe('OrdrerepriseComponent', () => {
  let component: OrdrerepriseComponent;
  let fixture: ComponentFixture<OrdrerepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdrerepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdrerepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
