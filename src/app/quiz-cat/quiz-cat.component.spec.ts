import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCatComponent } from './quiz-cat.component';

describe('QuizCatComponent', () => {
  let component: QuizCatComponent;
  let fixture: ComponentFixture<QuizCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
