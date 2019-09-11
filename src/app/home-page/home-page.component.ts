import { Persona } from './../shared/persona.model';
import { PersonaService } from './persona.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, Data } from '@angular/router';
import { Dialog } from 'primeng/components/dialog/dialog';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  selectedGender: string;
  persone: Persona[];
  pers: Persona;
  col: any[];
  data: Data;
  displayDelete = false;
  displayEdit = false;
  submitted = false;
  constructor(private perso: PersonaService, private router: Router) { }
  @ViewChild('f', {static: false}) signupForm: NgForm;
  ngOnInit() {

    this.perso.getPeoplefromWeb().subscribe((data: Persona) => {
      this.persone = data;
      this.pers = this.persone[0];
    });
    this.col = [
      { field: 'nome', header: 'Nome' },
      { field: 'cognome', header: 'Cognome' },
      { field: 'dataNascita', header: 'Data di Nascita' },
      { field: 'codFiscale', header: 'Codice Fiscale' },
      { field: 'sesso', header: 'Sesso' }
    ];
  }

  showDialogDelete(pe: Persona) {
    this.pers = pe;
    console.log(this.pers.id, this.pers.nome);
    this.displayDelete = true;
  }

  showDialogEdit(pe: Persona) {
    this.pers = pe;
    console.log(this.pers.id);
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

  editIt(event: HTMLBaseElement, dati: Persona) {
    console.log("Nome: " + this.pers.id + this.pers.nome);
  }

  onSubmit() {
    this.submitted = true;
    this.pers.nome = this.signupForm.value.userData.nome;
    this.pers.email = this.signupForm.value.userData.email;
    this.pers.secretQuestion = this.signupForm.value.secret;
    this.pers.answer = this.signupForm.value.questionAnswer;
    this.pers.gender = this.signupForm.value.gender;
    this.signupForm.reset();
  }
}
