import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayingService {
  displayIntruct$ =new Subject<boolean>();
  startedPlayingQuiz$ = new BehaviorSubject<number>(0);
  constructor() { }
}
