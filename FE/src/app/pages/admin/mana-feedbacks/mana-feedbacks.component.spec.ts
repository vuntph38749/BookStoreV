import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaFeedbacksComponent } from './mana-feedbacks.component';

describe('ManaFeedbacksComponent', () => {
  let component: ManaFeedbacksComponent;
  let fixture: ComponentFixture<ManaFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaFeedbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManaFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
