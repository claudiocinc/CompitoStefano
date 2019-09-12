import { Persona } from './../shared/persona.model';
import { PersonaService } from './persona.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, Data } from '@angular/router';
import { Dialog } from 'primeng/components/dialog/dialog';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { CittaService } from './citta.service';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('tabella',{static:true}) table: Table;
  filters: any = {};
  selectedGender: string;
  modifica = false;
  crea = false;
  datam: Data;
  persone: Persona[];
  cities: City[];
  pers: Persona;
  cols: any[];
  sex: string;
  data: Data;
  selectedCity: string;
  selectedProv: string;
  displayDelete = false;
  displayEdit = false;
  submitted = false;
  dateFilters: any;
  checkoutForm: FormGroup;
  @ViewChild('dt',{static: true}) private _table: Table;
  constructor(private citService: CittaService, private perso: PersonaService, private router: Router, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      nome: '',
      cognome: '',
      id: '',
      datadinascita: '',
      sesso: '',
      indirizzo: '',
      citta: '',
      provincia: ''
    });
  }
  ngOnInit() {
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'cognome', header: 'Cognome' },
      { field: 'datadinascita', header: 'Data di Nascita' },
      { field: 'codicefiscale', header: 'Codice Fiscale' },
      { field: 'sesso', header: 'Sesso' }
  ];
    this.perso.getPeoplefromWeb().subscribe((data: Persona) => {
      this.persone = data;
    });
    this.citService.getCityfromWeb().subscribe((data: City) => {
      this.cities = data;
      console.log(this.cities);
    });
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'cognome', header: 'Cognome' },
      { field: 'id', header: 'Codice Fiscale' },
      { field: 'datadinascita', header: 'Data di Nascita' },
      { field: 'sesso', header: 'Sesso' }
    ];
  }

  showDialogDelete(pe: Persona) {
    this.pers = pe;
    console.log(this.pers.id, this.pers.nome);
    this.displayDelete = true;
  }

  showDialogEdit(pe: Persona) {
    this.crea = false;
    this.modifica = true;
    this.checkoutForm.setValue(pe);
    console.log(this.checkoutForm);
    this.selectedCity = pe.citta;
    console.log(this.selectedCity);
    this.selectedProv = pe.provincia;
    //console.log(this.pers.id);
    this.displayEdit = true;
  }
  showDialogCreate() {
    this.modifica = false;
    this.crea = true;
    this.checkoutForm.reset()
    console.log(this.checkoutForm);
    this.displayEdit = true;
  }

  deleteIt(event: HTMLBaseElement, pe: Persona) {
    console.log(pe.id);
    this.perso.deletePerson(pe.id).subscribe(result => {
      console.log(result);
      this.perso.getPeoplefromWeb().subscribe((data: Persona) => {
        this.persone = data;
      });
    });
  }
  
  showDialogMaximized(event, dialog: Dialog) {
    dialog.maximized = true;
}

  /*editIt(event: HTMLBaseElement, dati: Persona) {
    console.log("Nome: " + this.pers.id + this.pers.nome);
  }
*/
  onSubmit(customerData: Persona) {
    //this.datam.toLocaleDateString("en-GB");
    //customerData.datadinascita=this.datam.toLocaleDateString("en-GB");
    console.log(customerData);
    this.perso.updatePerson(customerData).subscribe(result => {
      console.log(result);
      this.perso.getPeoplefromWeb().subscribe((data: Persona) => {
        this.persone = data;
      });
    });
    this.checkoutForm.reset();
  }
  onSubmitAdd(customerData: Persona) {
    //this.datam.toLocaleDateString("en-GB");
    //customerData.datadinascita = this.datam.toLocaleDateString("en-GB");
    this.perso.createPerson(customerData).subscribe(result => {
      console.log(result);
      this.perso.getPeoplefromWeb().subscribe((data: Persona) => {
        this.persone = data;
      });
    });
    this.checkoutForm.reset();
  }
}
