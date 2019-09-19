import { CreasquadraService } from './crea-squadra/creasquadra.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CompitoStefano';
  stepsvis = true;
  constructor(private createserv: CreasquadraService) {}
  creasquadra() {
    this.createserv.endcreasquadra();
  }
}
