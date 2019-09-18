import { ToastModule } from 'primeng/toast';
import { Persona } from './../shared/persona.model';
import { PersonaService } from './persona.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, Data } from '@angular/router';
import { Dialog } from 'primeng/components/dialog/dialog';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { CittaService } from './citta.service';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import CodiceFiscale from 'codice-fiscale-js';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/components/common/api';
import { ToastMessagesService } from '../toast-messages.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private citService: CittaService, private perso: PersonaService, private router: Router, private formBuilder: FormBuilder, private messageService: ToastMessagesService) {
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
  @ViewChild('dt', { static: true }) table: Table;
  filters: any = {};
  selectedGender: string;
  id: string;
  cfvalido = true;
  modifica = false;
  disabled: boolean;
  crea = false;
  filtro: string[];
  datam: Data;
  nomefilt: string;
  cognomefilt: string;
  cffilt: string;
  genere: string;
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
  @ViewChild('dt', { static: true }) private dt: Table;
  ngOnInit() {
    console.log(this.dt);
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'cognome', header: 'Cognome' },
      { field: 'datadinascita', header: 'Data di Nascita' },
      { field: 'id', header: 'Codice Fiscale' },
      { field: 'sesso', header: 'Sesso' }
    ];
    console.log(this.cols);
    this.perso.getPeoplefromWeb().subscribe((data: Persona[]) => {
      this.persone = data;
    });
    this.citService.getCityfromWeb().subscribe((data: City[]) => {
      this.cities = data;
      console.log(this.cities);
    });
  }

  showDialogDelete(pe: Persona) {
    this.pers = pe;
    console.log(this.pers.id, this.pers.nome);
    this.displayDelete = true;
  }

  showDialogEdit(pe: Persona) {
    this.genere = 'Modifica elemento';
    this.disabled = false;
    this.crea = false;
    this.modifica = true;
    this.checkoutForm.setValue(pe);
    console.log(this.checkoutForm);
    this.selectedCity = pe.citta;
    console.log(this.selectedCity);
    this.selectedProv = pe.provincia;
    // console.log(this.pers.id);
    this.displayEdit = true;
  }
  showDialogInfo(pe: Persona) {
    this.genere = 'Informazioni elemento';
    this.disabled = true;
    this.crea = false;
    this.modifica = true;
    this.checkoutForm.setValue(pe);
    console.log(this.checkoutForm);
    this.selectedCity = pe.citta;
    console.log(this.selectedCity);
    this.selectedProv = pe.provincia;
    // console.log(this.pers.id);
    this.displayEdit = true;
  }
  showDialogCreate() {
    this.genere = 'Crea elemento';
    this.disabled = false;
    this.modifica = false;
    this.crea = true;
    // this.checkoutForm.reset();
    console.log(this.checkoutForm);
    this.displayEdit = true;
  }

  deleteIt(event: HTMLBaseElement, pe: Persona) {
    console.log(pe.id);
    this.perso.deletePerson(pe.id).subscribe(result => {
      console.log(result);
      this.messageService.calltoast('success', 'Eliminazione completata', 'L\'utente è stato eliminato dal DB!');
      this.perso.getPeoplefromWeb().subscribe((data: Persona[]) => {
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
    console.log(customerData);
    this.perso.updatePerson(customerData).subscribe(result => {
      console.log(result);
      // this.checkoutForm.reset();
      console.log('inserito update');
      this.perso.getPeoplefromWeb().subscribe((data: Persona[]) => {
        this.persone = data;
      });
    });
  }
  onSubmitAdd(customerData: Persona) {
    this.perso.createPerson(customerData).subscribe(result => {
      console.log(result);
      // this.checkoutForm.reset();
      console.log('inserito create');
      this.perso.getPeoplefromWeb().subscribe((data: Persona[]) => {
        this.persone = data;
      });
    });

  }
  reset(dt) {
    console.log(this.filtro);
    dt.reset();
  }
  close() {
    this.displayEdit = false;
    this.checkoutForm.reset();
  }
  validatecf(form, nome, cognome, giornodinascita, sesso, citta, provincia, cf) {
    console.log();
    const cittalab = this.getname(citta);
    const provincialab = this.getname(provincia);
    console.log(nome);
    console.log(cognome);
    console.log(sesso);
    console.log(cittalab.toLocaleUpperCase());
    console.log(provincialab.toLocaleUpperCase());
    console.log(giornodinascita.slice(0, 2));
    console.log(giornodinascita.slice(3, 5));
    console.log(giornodinascita.slice(6, 10));
    const codfiscale = new CodiceFiscale({
      name: nome,
      surname: cognome,
      gender: sesso,
      day: giornodinascita.slice(0, 2),
      month: giornodinascita.slice(3, 5),
      year: giornodinascita.slice(6, 10),
      birthplace: cittalab.toLocaleUpperCase(),
    //  birthplaceProvincia: provincialab.toLocaleUpperCase().slice(0, 2)
    });
    if (codfiscale.code === cf) {
      this.cfvalido = true;
      if (this.modifica && this.cfvalido === true) {
        this.onSubmit(form);
        this.displayEdit = false;
      }
      if (this.crea && this.cfvalido === true) {
        this.onSubmitAdd(form);
        this.displayEdit = false;
      }
      this.checkoutForm.reset();
      this.messageService.calltoast('success', 'Operazione completata con successo', 'L\'utente è stato correttamente caricato sul server!');
    } else {
      console.log('Codice non valido');
      this.displayEdit = true;
      this.cfvalido = false;
      this.messageService.calltoast('error', 'Codice fiscale errato', 'Impossibile completare l\'inserimento perchè il codice fiscale è errato');
    }
  }
  getname(id: string): string {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].value === id) {
        return this.cities[i].label;
      }
    }
  }
}
