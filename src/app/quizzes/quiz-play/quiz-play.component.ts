import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../model/quiz.model";
import {Observable, Subject, Subscription} from "rxjs";
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayingService} from "../playing.service";
import {Question} from "../../model/question.model";

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.css']
})
export class QuizPlayComponent implements OnInit {
  quiz!: Quiz;
  displayIntruct=true;
  quizId!: number;
  questions$!:  Observable<Array<Question>>;
  questions!:  Array<Question>;

  constructor(private quizService: QuizService,
              private playingService: PlayingService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.playingService.displayIntruct$.next(true);
     this.playingService.displayIntruct$.subscribe(data => {
      this.displayIntruct = data
    })
    console.log(this.route.snapshot.url)
    this.quizId = this.route.snapshot.params['id'];
    this.playingService.startedPlayingQuiz$.next(Number(this.quizId));


    console.log(Number(this.quizId))
    console.log(typeof Number(this.quizId))

    this.quizService.getQuiz(Number(this.quizId)).subscribe({
      next: (data) => {
        this.quiz = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onPlay() {
    this.playingService.displayIntruct$.next(false)
    // this.router.navigate(['playing'],{relativeTo : this.route});
    this.playingService.startedPlayingQuiz$.next(Number(this.quizId));
    this.quizService.getQuizQuestions(Number(this.quizId)).subscribe({
      next: (data) => {
        this.questions = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
