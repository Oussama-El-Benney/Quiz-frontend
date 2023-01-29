import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Quiz} from "../model/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public getQuizzes():Observable<Array<Quiz>>{
    this.http.get<any>(environment.backendHost+"/api/quizzes/2").subscribe(data=>{
      console.log(data)
    })
    this.http.get<any>(environment.backendHost+"/quizzes").subscribe(data=>{
      console.log(data)
    });
    return this.http.get<Array<Quiz>>(environment.backendHost+"/api/quizzes");
  }

}
