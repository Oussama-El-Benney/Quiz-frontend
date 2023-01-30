import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPlayComponent } from './quiz-play.component';

describe('QuizPlayComponent', () => {
  let component: QuizPlayComponent;
  let fixture: ComponentFixture<QuizPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
