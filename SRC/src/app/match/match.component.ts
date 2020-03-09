import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Match } from './match.model';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})

export class MatchComponent implements OnInit {
  
  @Input() match: Match;
  @Output() winner = new EventEmitter<any>();

  ngOnInit() {}

  // generate random champion
  generateWinner() {

    let { head, headInRound, headNextMatch, headNextRound, winner, empty, teamA, teamB } = this.match;
    
    const index = Math.round(Math.random() * 1);
    index === 0 ? winner = teamA : winner = teamB;
    
    this.winner.emit(
      { head, headInRound, headNextMatch, headNextRound, winner, empty }
    );
  }

}
