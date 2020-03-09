import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Team } from './team.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  @ViewChild('name', { static: false }) nameTeamField: ElementRef;

  form: FormGroup;
  currentTeam: Team;
  teamName = '';
  force: string | number = 0;
  attack: string | number = 0;
  counterattack: string | number = 0;
  defense: string | number = 0;
  success = false;

  teams: Array<Team> = new Array(8).fill({ name: '', force: 0, attack: 0, counterattack: 0, defense: 0 });
  counterTeam = 0;
  totalTeams = 8;
  teamsCompleted = false;
  nameInputInvalid = true;
  widthBar: string;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    console.log(this.teams);
    this.currentTeam = this.teams[0];
    this.form = new FormGroup({
      teamName: new FormControl(''),
      force: new FormControl(0),
      attack: new FormControl(0),
      counterattack: new FormControl(0),
      defense: new FormControl(0),
    });

    this.form.get('teamName').valueChanges.subscribe(
      value => this.teamName = value
    ); 

    this.form.get('force').valueChanges.subscribe(
      value => this.force = value
    );

    this.form.get('attack').valueChanges.subscribe(
      value => this.attack = value
    );

    this.form.get('counterattack').valueChanges.subscribe(
      value => this.counterattack = value
    );

    this.form.get('defense').valueChanges.subscribe(
      value => { 
        this.defense = value;
      }
    );
  }

  ngAfterViewInit(): void {
    this.nameTeamField.nativeElement.focus();
  }
  

  toTournament() {
    if (this.teamsCompleted) {
      this.router.navigateByUrl('/tournament');
    }
  }

  deleteTeam(index: number) {
    this.teamsCompleted = false;
    if (this.counterTeam > 0) {
      this.counterTeam--;
    }
    this.teams[index] = { name: '', force: 0, attack: 0, counterattack: 0, defense: 0 };

    console.log(this.teams);
  }

  selectTeam(index: number) {
    this.currentTeam = this.teams[index];
    const { name, counterattack, attack, defense, force } = this.currentTeam;
    this.attack = attack;
    this.counterattack = counterattack;
    this.defense = defense;
    this.teamName = name;
    this.force = force;
  }

  addTeam() {
    const index = this.teams.findIndex(team => team.name === '');

    if (index !== -1 && !this.teamsCompleted) {
      this.counterTeam++;
      this.teams[index] = {
        name: this.teamName,
        force: this.force,
        attack: this.attack,
        counterattack: this.counterattack,
        defense: this.defense
      };
  
      console.log('index', index)
      console.log(this.teams);

      if (this.counterTeam === 8) {
        console.log('completed');
        this.teamsCompleted = true;
        localStorage.setItem('teams', JSON.stringify(this.teams));
      }

      this.success = true;
      this.reset();
    } 
  }

  reset() {
    this.teamName = '';
    this.force = 0;
    this.attack = 0;
    this.counterattack = 0;
    this.defense = 0;

    this.nameTeamField.nativeElement.focus();
  }

}
