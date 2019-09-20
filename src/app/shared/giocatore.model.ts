import { Persona } from './persona.model';
export interface Giocatore extends Persona {
    ruolo: string;
    altezza: string;
    peso: string;
    piedepreferito: string;
    numeromaglia: string;
}
