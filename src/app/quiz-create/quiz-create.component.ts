import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {QuizService} from "../services/quiz.service";
import {Quiz} from "../model/quiz.model";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  // @ts-ignore
  @ViewChild('f') slForm: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Quiz;
  addQuest! : boolean;
  questNbr$! : Observable<number>;
  questNbr! : number;
  addedQuiz! : Quiz;
  constructor(private quizService: QuizService,
              private router: Router,) { }

  counter(i: number) {
    return new Array(i);
  }
  ngOnInit() {
    this.subscription = this.quizService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.quizService.getQuiz(index).subscribe({
            next : (data)=>{
              this.editedItem = data;
              // console.log(data._embedded.quizzes[0].name);
            },
            error : (err)=>{
              console.log(err);
            }});

          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const newQuiz = new Quiz(999,value.name, value.description);
    if (this.editMode) {
      this.quizService.updateQuiz(this.editedItemIndex, newQuiz);
    } else {
      this.quizService.addQuiz(newQuiz).subscribe(data => {
        console.log(data)
        this.addedQuiz = data;
        this.router.navigate(['quizzes/create/add-question'], {queryParams: {quizId: this.addedQuiz.id}});
      });
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.quizService.deleteQuiz(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddQuestion(i: Observable<number>) {
    i.subscribe({
      next : (data)=>{
        console.log(data);
        // console.log(data._embedded.quizzes[0].name);
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }
}
