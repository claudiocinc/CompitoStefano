import { squadra } from './../../shared/squadra.model';
import { CreasquadraService } from './../creasquadra.service';
import { CittaService } from './../../home-page/citta.service';
import { Component, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit, AfterContentChecked {
  creazionesquadra: FormGroup;
 // squadra: squadra;
  selectedcolore1: string;
  selectedcolore2: string;
  selectedCity: string;
  colori: Colore[];
  cities: City[];
  constructor( private formBuilder: FormBuilder, private citieserv: CittaService, private creaserv: CreasquadraService, private router: Router, private route: ActivatedRoute) {
    this.creazionesquadra = this.formBuilder.group({
      id: '',
      presidente: '',
      primocolore: '',
      secondocolore: '',
      citta: '',
      stadio: '',
      annofondazione: ''
    });
  }

  ngOnInit() {
    this.creaserv.creasquadralab();
    this.creaserv.ottienicolori().subscribe((data: Colore[]) => {
      this.colori = data;
    });
    this.citieserv.getCityfromWeb().subscribe((data: City[]) => {
      this.cities = data;
    });
    this.creaserv.creasquadralab();
    this.creaserv.setactiveindex(0);
  }
  ngAfterContentChecked() {
    this.creaserv.creasquadralab();
  }
insert(creazionesquadra: squadra) {
  this.creaserv.insertstep1(creazionesquadra).subscribe(() => {
    console.log('Inserimento effettuato');
    this.router.navigate(['/creasquadra/step2']);
  });
}
}
