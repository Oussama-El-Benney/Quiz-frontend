import { Component, OnInit } from '@angular/core';

import {QuizService} from "../services/quiz.service";
import {Observable} from "rxjs";
import {Quiz} from "../model/quiz.model";

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  quizzes$!: Observable<Array<Quiz>>;

  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizzes$=this.quizService.getQuizzes();
    this.quizService.getQuizzes().subscribe({
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
