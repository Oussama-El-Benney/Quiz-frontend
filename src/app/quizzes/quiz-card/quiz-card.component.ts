
import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../model/quiz.model";


@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {

  @Input() quiz!: Quiz;
  @Input() index!: number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.quiz);

}}
