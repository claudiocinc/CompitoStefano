import { Giocatore } from './../../shared/giocatore.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonaService } from './../../home-page/persona.service';
import { Component, OnInit } from '@angular/core';
import { CreasquadraService } from '../creasquadra.service';
import { Persona } from 'src/app/shared/persona.model';
import { Ruolo } from 'src/app/shared/ruoli.model';
import { Dialog } from 'primeng/dialog';
import { squadra } from 'src/app/shared/squadra.model';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit, Giocatore {
  ruolo: string;
  altezza: string;
  peso: string;
  piedepreferito: string;
  numeromaglia: string;
  nome?: string;
  cognome?: string;
  id?: string;
  datadinascita?: string;
  sesso?: string;
  indirizzo?: string;
  citta?: string;
  provincia?: string;
  creazionegiocatore: FormGroup;
  selectedpiede: string;
  selectedaltezza: string;
  selectedpeso: string;
  rosa: Giocatore[] = [];
  cols = [
    { field: 'nome', header: 'Nome' },
    { field: 'cognome', header: 'Cognome' },
    { field: 'id', header: 'Codice Fiscale' },
    { field: 'sesso', header: 'Sesso' },
    { field: 'ruolo', header: 'Ruolo' },
    { field: 'piede', header: 'Piede' }
  ];
  constructor(private creaserv: CreasquadraService, private pers: PersonaService, private formBuilder: FormBuilder) {
    this.creazionegiocatore = this.formBuilder.group({
      id: '',
      nome: '',
      cognome: '',
      ruolo: '',
      piede: '',
      altezza: '',
      peso: '',
      numeromaglia: ''
    });
  }
  addplayer = false;
  choseperson: Persona;
  persone: Persona[];
  squad: squadra;
  ruoli: Ruolo[];
  cf: string[];
  selectedcf: string;
  piedi = [
    { label: 'Destro', value: 'Destro' },
    { label: 'Sinistro', value: 'Sinistro' },
    { label: 'Ambidestro', value: 'Ambidestro' }
  ];
  ngOnInit() {
    this.squad = this.creaserv.squadra;
    this.nome = this.creaserv.squadra.id;
    console.log(this.rosa);
    this.rosa = this.creaserv.giocatori;
    console.log(this.rosa);
    this.creaserv.creasquadralab();
    this.creaserv.setactiveindex(1);
    this.pers.getPeoplefromWeb().subscribe((data: Persona[]) => {
      this.persone = data;
      console.log(this.persone);
    });
    this.creaserv.getRuolifromWeb().subscribe((data: Ruolo[]) => {
      this.ruoli = data;
    });
  }
  addplayerbutton() {
    this.addplayer = true;
  }
  addplayerfunc(persona: Persona, player: Giocatore) {
    console.log(player);
    player.nome = persona.nome;
    player.cognome = persona.cognome;
    player.id = persona.id;
    player.datadinascita = persona.datadinascita;
    player.indirizzo = persona.indirizzo;
    player.citta = persona.citta;
    player.provincia = persona.provincia;
    player.sesso = persona.sesso;
    console.log(player);
    console.log(this.rosa);
    this.rosa.push(player);
    this.squad.giocatori = this.rosa;
    this.creaserv.addplayer(this.squad);
  }
  loadpeople(persona: Persona) {
    console.log(persona);
    this.pers.getPerson(persona.id).subscribe((pers: Persona) => {
      this.choseperson = pers;
      console.log(this.choseperson);
    });
  }
  showDialogMaximized(event, dialog: Dialog) {
    dialog.maximized = true;
  }
}
