import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../model/quiz.model";
import {Question} from "../../model/question.model";
import {PlayingService} from "../playing.service";
import {NgForm} from "@angular/forms";
import {UserAnswer} from "../../model/userAnswer.model";

@Component({
  selector: 'app-quiz-playing',
  templateUrl: './quiz-playing.component.html',
  styleUrls: ['./quiz-playing.component.css']
})
export class QuizPlayingComponent implements OnInit {
  quiz!: Quiz;
  questions!: Array<Question>;
  quizId!: number;
  choice! :string;
  currentQuestion= 0;
  @Input() question!: Question;
  @Input() index!: number;
  private userScore= 0;
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

  onSubmit(choice : string) {
    if(this.choice === choice)
        this.choice ="";
    else
        this.choice =choice ;

    console.log(this.choice);


    // this.quizService.verifyAnswer(userAnswer).subscribe(data => {
    //   console.log(data)
    //   this.addedQuestion = data;
    // });
  }


  onConfirm() {
    console.log(this.questions[this.currentQuestion].id);
    let userAnswer = new UserAnswer(this.questions[this.currentQuestion].id,this.choice);
    console.log(userAnswer);
    this.quizService.verifyAnswer(userAnswer).subscribe(data => {
      console.log(data);
      (data) ? this.userScore++ : this.userScore--;
    });
    console.log(this.userScore);
    console.log(this.questions.length);
    if((this.questions.length-1)==this.currentQuestion){
      this.playingService.userScore$.next(this.userScore);
      // this.router.navigate(['/quiz-result']);
      this.router.navigate(['../quiz-result'], {relativeTo: this.route});
    }
 else   this.currentQuestion++;
  }
}
