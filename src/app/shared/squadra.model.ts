import { Giocatore } from './giocatore.model';

export interface squadra {
    id: string;
    coloresociale1: string;
    coloresociale2: string;
    presidente: string;
    citta: string;
    stadio: string;
    giocatori: Giocatore[];
    annofondazione: string;
}
