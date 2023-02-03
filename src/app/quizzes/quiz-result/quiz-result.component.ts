import { Component, OnInit } from '@angular/core';
import {PlayingService} from "../playing.service";

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  userScore!: number;

  constructor( private playingService: PlayingService,) { }

  ngOnInit(): void {
    this.playingService.userScore$.subscribe(data => {
      console.log(data)

      this.userScore  = data;
      console.log(this.userScore);
    })
  }

}
