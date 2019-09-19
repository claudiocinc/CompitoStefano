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
export class Step2Component implements OnInit {
  creazionegiocatore: FormGroup;
  selectedpiede: string;
  selectedaltezza: string;
  selectedpeso: string;
  cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'cognome', header: 'Cognome' },
      { field: 'id', header: 'Codice Fiscale' },
      { field: 'sesso', header: 'Sesso' },
      { field: 'ruolo', header: 'Ruolo' },
      { field: 'piede', header: 'Piede' }
  ];
  constructor(private creaserv: CreasquadraService, private pers: PersonaService, private formBuilder: FormBuilder ) {
    this.creazionegiocatore = this.formBuilder.group({
      id: '',
      ruolo: '',
      piede: '',
      altezza: '',
      peso: ''
    });
  }
  addplayer = false;
  persone: Persona[];
  squad: squadra;
  ruoli: Ruolo[];
  selectedcf: string;
  piedi = [
    {label: 'Destro'},
    {label: 'Sinistro'},
    {label: 'Ambidestro'}
  ];
  ngOnInit() {
    this.creaserv.creasquadralab();
    this.creaserv.setactiveindex(1);
    this.creaserv.getsquadra().subscribe((data: squadra) => {
      this.squad = data;
    });
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
  showDialogMaximized(event, dialog: Dialog) {
    dialog.maximized = true;
  }
}
