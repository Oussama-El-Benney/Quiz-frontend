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
  quizzess = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    },
    {
      id: 4,
      name: 'Chris'
    },
    {
      id: 5,
      name: 'Chris'
    },
    {
      id: 6,
      name: 'Chris'
    },
    {
      id: 7,
      name: 'Chris'
    },
    {
      id: 8,
      name: 'Chris'
    },
    {
      id: 9,
      name: 'Chris'
    },
    {
      id: 10,
      name: 'Chris'
    },
    {
      id: 11,
      name: 'Chris'
    }
  ];
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
