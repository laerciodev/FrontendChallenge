import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../dashboard/team.model';
import { Match } from '../match/match.model';

@Component({
    selector: 'tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})

export class TournamentComponent implements OnInit {
    
    teams: Array<Team> = [];
    matches: Array<Match> = [];
    rounds: Array<any>;
    numberTeams: number;
    championTeam: string;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.initGame();
    }

    initGame() {
        this.rounds = [];
        this.teams = JSON.parse(localStorage.getItem('teams'));
        this.numberTeams = this.teams.length;
        this.generateRounds();
        this.addTeams();
    }

    generateRounds() {
        const rounds = 4;
        let matches = this.numberTeams / 2;

        for (let r = 0; r < rounds; r++) {
            this.rounds[r] = new Array();

            for (let m = 0; m < matches; m++) {
                const headNextRound = r + 1;
                const headNextMatch = Math.floor(m/2);

                this.rounds[r][m] = {
                   teamA: { force: 0, attack: 0, counterattack: 0, defense: 0, name: 'time 1' },
                   teamB: { force: 0, attack: 0, counterattack: 0, defense: 0, name: 'time 2' },
                   winner: {},
                   head: r,
                   headInRound: m,
                   headNextRound,
                   headNextMatch,
                   empty: true
                };
            }
         
            matches /= 2;
        }
    }


    addTeams() {
        const quarterMatchs = this.rounds[0];
        let countMatch = 0;

        let i = 0;

        while (i < this.numberTeams) {
            if (i % 2 === 0) {
                quarterMatchs[countMatch].teamA = this.teams[i];
            } else {
                quarterMatchs[countMatch].teamB = this.teams[i];
                quarterMatchs[countMatch].empty = false;
                countMatch++;
            }

            i++;
        }
    }

    getWinner(value) {

        if (!value.empty) {
            const { headNextRound, headNextMatch, headInRound, winner } = value;
            const posWinner = this.rounds[headNextRound][headNextMatch];
            const lastRound = this.rounds.length - 1;
            const posChampion = this.rounds[lastRound][0];

            if (posWinner === posChampion) {
                this.championTeam = value.winner.name;
            } 

            if (headInRound % 2 === 0) {
                posWinner.teamA = winner;
            } else {
                posWinner.teamB = winner;
                posWinner.empty = false;
            }
        }
    }

    resetGame() {
        this.initGame();
    }

    exit() {
        this.router.navigateByUrl('');
        localStorage.clear();
    }
}


