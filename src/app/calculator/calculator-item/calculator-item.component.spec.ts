import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorItemComponent } from './calculator-item.component';

describe('CalculatorItemComponent', () => {
  let component: CalculatorItemComponent;
  let fixture: ComponentFixture<CalculatorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
