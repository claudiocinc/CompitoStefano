import { CreasquadraService } from './creasquadra.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { ToastMessagesService } from '../toast-messages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crea-squadra',
  templateUrl: './crea-squadra.component.html',
  styleUrls: ['./crea-squadra.component.scss']
})
export class CreaSquadraComponent implements OnInit, OnChanges {
  items: MenuItem[];
  activeIndex = 0;
  crea = false;
  cols = [
    { field: 'id', header: 'Nome' },
    { field: 'presidente', header: 'Presidente' },
    { field: 'stadio', header: 'Stadio' }
  ];
    constructor(private messageService: ToastMessagesService, private router: Router, private route: ActivatedRoute, private creaservice: CreasquadraService) {}

  ngOnInit() {
    this.items = [
      {label: 'Creazione squadra', command: (event: any) => {
        this.activeIndex = 0;
        this.router.navigate(['step1'], {relativeTo: this.route});
    }},
      {label: 'Inserimento giocatori', command: (event: any) => {
        this.activeIndex = 1;
        this.router.navigate(['step2'], {relativeTo: this.route});
      }},
      {label: 'Riepilogo', command: (event: any) => {
        this.activeIndex = 2;
        this.router.navigate(['step3'], {relativeTo: this.route});
    }}
    ];
    this.crea = this.creaservice.crea;
    this.creaservice.setactiveindex(0);
  }
  ngOnChanges() {
    this.crea = false;
    this.activeIndex = this.creaservice.activateindex;
  }
  iniziacreazionesquadra() {
    this.creaservice.creasquadralab();
    this.crea = this.creaservice.crea;
    this.router.navigate(['step1'], {relativeTo: this.route});
  }

}
