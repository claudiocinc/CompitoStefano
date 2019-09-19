import { CreaSquadraComponent } from './crea-squadra/crea-squadra.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './crea-squadra/step1/step1.component';
import { Step2Component } from './crea-squadra/step2/step2.component';
import { Step3Component } from './crea-squadra/step3/step3.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'creasquadra', component: CreaSquadraComponent, children: [
    {path: 'step1', component: Step1Component},
    {path: 'step2', component: Step2Component},
    {path: 'step3', component: Step3Component}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
