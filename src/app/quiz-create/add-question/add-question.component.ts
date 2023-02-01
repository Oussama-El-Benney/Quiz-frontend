import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
              private quizService: QuizService,) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.queryParams['quizId']);
    this.quizId = this.route.snapshot.params['quizId'];
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const newQuestion = new Question(999, value.name, [""], "", this.quizId);

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

  ngOnDestroy() {
  }

}
