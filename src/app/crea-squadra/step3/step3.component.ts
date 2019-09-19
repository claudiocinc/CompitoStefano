import { Component, OnInit } from '@angular/core';
import { CreasquadraService } from '../creasquadra.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  constructor(private creaserv: CreasquadraService) { }

  ngOnInit() {
    this.creaserv.creasquadralab();
  }
}
