import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz/quiz.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {QuizCatComponent} from "./quiz-cat/quiz-cat.component";
import {QuizItemComponent} from "./quiz/quiz-item/quiz-item.component";
import {QuizzesComponent} from "./quizzes/quizzes.component";

const routes: Routes = [
  {path: "quiz", component: QuizComponent},
  {path: "quizzes", component: QuizzesComponent},
  {path: "quiz/:id", component: QuizItemComponent},
  {path: "category", component: QuizCatComponent},
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
