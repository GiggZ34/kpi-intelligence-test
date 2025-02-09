import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInCardComponent } from './list-in-card.component';

describe('CardComponent', () => {
  let component: ListInCardComponent;
  let fixture: ComponentFixture<ListInCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListInCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
