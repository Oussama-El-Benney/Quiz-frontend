import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Question} from "../../model/question.model";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @ViewChild('f') slForm!: NgForm;
  editMode = false;
  quizId!: number;
  addedQuestion!: any;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private router: Router,) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.queryParams['quizId']);
    this.quizId = this.route.snapshot.queryParams['quizId'];
  }

  getCorrectChoice(value: any) {
    if (value.choice1checkbox) {
      return value.choice1;
    } else if (value.choice2checkbox) {
      return value.choice2;
    } else if (value.choice3checkbox) {
      return value.choice3;
    }
    return value.choice4;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    let correctChoice = this.getCorrectChoice(value);
    console.log(this.quizId);
    const newQuestion = new Question(999, value.question, [value.choice1, value.choice2, value.choice3, value.choice4], correctChoice, this.quizId);
    console.log(newQuestion);
    this.quizService.addQuestion(newQuestion).subscribe(data => {
      console.log(data)
      this.addedQuestion = data;
    });

    form.reset();
  }

  onClear() {
    this.slForm.reset();
  }

  onDelete() {
    this.onClear();
  }
  onFinish() {
    this.router.navigate(['/quizzes',this.quizId] );
  }

  ngOnDestroy() {
  }

}
