import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../model/quiz.model";
import {Question} from "../../model/question.model";
import {PlayingService} from "../playing.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-quiz-playing',
  templateUrl: './quiz-playing.component.html',
  styleUrls: ['./quiz-playing.component.css']
})
export class QuizPlayingComponent implements OnInit {
  quiz!: Quiz;
  questions!: Array<Question>;
  quizId!: number;
  currentQuestion= 0;
  @Input() question!: Question;
  @Input() index!: number;
  constructor(private quizService: QuizService,
              private playingService: PlayingService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.playingService.displayIntruct$.next(false);
    console.log(this.route.snapshot.url.toString())
    // this.quizId = this.route.snapshot.params['id'];


    this.playingService.startedPlayingQuiz$.subscribe(data => {
      console.log(data)

      this.quizId  = data;
      console.log(this.quizId);
    })
    this.playingService.startedPlayingQuiz$.subscribe({
        next: (v) => console.log(`observerA: ${v}`),
      });

    console.log(Number(this.quizId))
    console.log(this.quizId);
    this.quizService.getQuizQuestions(Number(this.quizId)).subscribe({
      next: (data) => {
        this.questions = data;
        console.log(this.questions);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value.choice2checkbox);
    let userChoice = this.getUserChoice(value);
    console.log(userChoice);

    // console.log(this.quizId);
    // this.quizService.verifyAnswer(newQuestion).subscribe(data => {
    //   console.log(data)
    //   this.addedQuestion = data;
    // });
    this.currentQuestion++;
    form.reset();
  }
  getUserChoice(value: any) {
    if (value.choice1checkbox) {
      return value.choice1;
    } else if (value.choice2checkbox) {
      return value.choice2;
    } else if (value.choice3checkbox) {
      return value.choice3;
    }
    return value.choice4;
  }

}
