import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
// import {environment} from "../../environments/environment";
import {Quiz} from "../model/quiz.model";
import {Question} from "../model/question.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  startedEditing = new Subject<number>();
  backendHost = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  public getQuizzes(): Observable<Array<Quiz>> {
    this.http.get<any>(this.backendHost + "/api/quizzes/2").subscribe(data => {
      console.log(data)
    })
    this.http.get<any>(this.backendHost + "/quizzes").subscribe(data => {
      console.log(data)
    });
    return this.http.get<Array<Quiz>>(this.backendHost + "/api/quizzes");
  }

  public getQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(this.backendHost + "/api/quizzes/" + id);
  }

  public getQuizQuestions(id: number): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(this.backendHost + "/api/quiz/" + id+"/questions");
  }

  updateQuiz(id: number, value: any) {

  }


  public addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.backendHost + "/api/add-quiz", quiz);
  }

  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.backendHost + "/api/add-question-to-quiz", question);
  }

  deleteQuiz(editedItemIndex: number) {

  }
}
