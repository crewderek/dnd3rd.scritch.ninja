import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBreakdownViewComponent } from './stat-breakdown-view.component';

describe('StatBreakdownViewComponent', () => {
  let component: StatBreakdownViewComponent;
  let fixture: ComponentFixture<StatBreakdownViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatBreakdownViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatBreakdownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
