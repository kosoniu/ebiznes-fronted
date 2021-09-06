import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginItemComponent } from './origin-item.component';

describe('OriginItemComponent', () => {
  let component: OriginItemComponent;
  let fixture: ComponentFixture<OriginItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
