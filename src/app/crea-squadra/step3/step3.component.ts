import { Giocatore } from './../../shared/giocatore.model';
import { Component, OnInit } from '@angular/core';
import { CreasquadraService } from '../creasquadra.service';
import { squadra } from 'src/app/shared/squadra.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  cols = [
    { field: 'nome', header: 'Nome' },
    { field: 'cognome', header: 'Cognome' },
    { field: 'id', header: 'Codice Fiscale' },
    { field: 'sesso', header: 'Sesso' },
    { field: 'ruolo', header: 'Ruolo' },
    { field: 'piede', header: 'Piede' }
];
  constructor(private creaserv: CreasquadraService, private route: ActivatedRoute, private router: Router) { }
  squad: squadra;
  nome: string;
  rosa: Giocatore [];
  ngOnInit() {
      this.squad = this.creaserv.squadra;
      this.nome = this.creaserv.squadra.id;
      console.log(this.rosa);
      this.rosa = this.creaserv.squadra.giocatori;
      console.log(this.rosa);
  }
  saveit() {
    this.creaserv.saveondb().subscribe(() => {
      console.log('Inserimento effettuato!');
      this.router.navigate(['/']);
    });
  }
}
