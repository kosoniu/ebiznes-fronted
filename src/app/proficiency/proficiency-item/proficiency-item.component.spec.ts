import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyItemComponent } from './proficiency-item.component';

describe('ProficiencyItemComponent', () => {
  let component: ProficiencyItemComponent;
  let fixture: ComponentFixture<ProficiencyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProficiencyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProficiencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
