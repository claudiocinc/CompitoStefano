import { HttpClient } from '@angular/common/http';
import { squadra } from './../shared/squadra.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class CreasquadraService implements squadra {
  id: string;
  coloresociale1: string;
  coloresociale2: string;
  presidente: string;
  citta: string;
  stadio: string;
  giocatori: string[];
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
    console.log(this.squadra);
    return this.http.post('http://localhost:3000/squadre', squadrains);
  }
  getsquadra() {
    return this.http.get('http://localhost:3000/squadre/Milan');
  }
  setactiveindex(value: number) {
    this.activateindex = value;
  }
  getRuolifromWeb() {
    return this.http.get('http://localhost:3000/ruoli');
  }
}
