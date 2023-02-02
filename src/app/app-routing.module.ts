import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz/quiz.component";
import {HomeComponent} from "./home/home.component";
import {QuizCatComponent} from "./quiz-cat/quiz-cat.component";
import {QuizItemComponent} from "./quiz/quiz-item/quiz-item.component";
import {QuizzesComponent} from "./quizzes/quizzes.component";
import {QuizPlayComponent} from "./quizzes/quiz-play/quiz-play.component";
import {QuizCreateComponent} from "./quiz-create/quiz-create.component";
import {AddQuestionComponent} from "./quiz-create/add-question/add-question.component";
import {QuizPlayingComponent} from "./quizzes/quiz-playing/quiz-playing.component";

const routes: Routes = [
  {path: "quiz", component: QuizComponent},
  {path: "quizzes", component: QuizzesComponent},
  {
    path: "quizzes/:id", component: QuizPlayComponent, children: [
      {path: "playing", component: QuizPlayingComponent},
    ]
  },
  {path: "quiz/create", component: QuizCreateComponent},
  {path: "quizzes/create/add-question", component: AddQuestionComponent},
  {path: "quiz/:id", component: QuizItemComponent},
  {path: "category", component: QuizCatComponent},
  {path: "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
