import { HttpClient } from '@angular/common/http';
import { squadra } from './../shared/squadra.model';
import { Injectable } from '@angular/core';
import { Giocatore } from './../shared/giocatore.model';
@Injectable({
  providedIn: 'root'
})

export class CreasquadraService implements squadra, Giocatore {
  ruolo: string;
  altezza: string;
  peso: string;
  piedepreferito: string;
  numeromaglia: string;
  nome?: string;
  cognome?: string;
  datadinascita?: string;
  sesso?: string;
  indirizzo?: string;
  provincia?: string;
  id: string;
  coloresociale1: string;
  coloresociale2: string;
  presidente: string;
  citta: string;
  stadio: string;
  giocatori: Giocatore[] = [];
  annofondazione: string;
  squadra: squadra;
  crea = false;
  activateindex = 0;
  constructor(private http: HttpClient) { }
  creasquadralab() {
    this.crea = true;
  }
  endcreasquadra() {
    this.crea = false;
  }
  ottienicolori() {
    return this.http.get('http://localhost:3000/colori');
  }
  insertstep1(squadrains: squadra) {
    this.squadra = squadrains;
    this.squadra.giocatori = [];
    console.log(this.squadra);
  }
  getsquadra() {
    return this.http.get('http://localhost:3000/squadre/' + this.squadra.id);
  }
  addplayer(squadr: squadra) {
    console.log(squadr);
    this.squadra = squadr;
  }
  saveondb() {
    return this.http.post('http://localhost:3000/squadre', this.squadra);
  }
  setactiveindex(value: number) {
    this.activateindex = value;
  }
  getRuolifromWeb() {
    return this.http.get('http://localhost:3000/ruoli');
  }
}
