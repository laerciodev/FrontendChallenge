import { Team } from '../dashboard/team.model';

export interface Match {
    teamA: Team;
    teamB: Team;
    winner: Team;
    head: number;
    headInRound: number;
    headNextRound: number;
    headNextMatch: number;
    empty: false;
}