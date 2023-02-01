import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizItemComponent } from './quiz/quiz-item/quiz-item.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import { QuizCatComponent } from './quiz-cat/quiz-cat.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizCardComponent } from './quizzes/quiz-card/quiz-card.component';
import { QuizPlayComponent } from './quizzes/quiz-play/quiz-play.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { AddQuestionComponent } from './quiz-create/add-question/add-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    QuizItemComponent,
    LoginComponent,
    QuizCatComponent,
    HeaderComponent,
    FooterComponent,
    QuizzesComponent,
    QuizCardComponent,
    QuizPlayComponent,
    QuizCreateComponent,
    AddQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
