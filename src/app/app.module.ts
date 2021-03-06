import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import {OrderListModule} from 'primeng/orderlist';
import { HomePageComponent } from './home-page/home-page.component';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { CreaSquadraComponent } from './crea-squadra/crea-squadra.component';
import {SidebarModule} from 'primeng/sidebar';
import { Step1Component } from './crea-squadra/step1/step1.component';
import { Step2Component } from './crea-squadra/step2/step2.component';
import { Step3Component } from './crea-squadra/step3/step3.component';
import {SpinnerModule} from 'primeng/spinner';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreaSquadraComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    OrderListModule,
    InputTextModule,
    MultiSelectModule,
    FormsModule,
    RadioButtonModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    SidebarModule,
    StepsModule,
    SpinnerModule
  ],
  providers: [HttpClient, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
