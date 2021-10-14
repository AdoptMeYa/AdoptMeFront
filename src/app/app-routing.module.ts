import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/AuthGuard';
import {MainTogglenavComponent } from './components/main-togglenav/main-togglenav.component';
import {HeaderComponent} from './components/header/header.component';
import {ViewAllPublicationsComponent } from './components/view-all-publications/view-all-publications.component';
import {SubscriptionsComponent} from './components/subscriptions/subscriptions.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
// tslint:disable-next-line:max-line-length
import {AdoptionRequestDialogComponent} from './components/adoptionRequest-dialog/adoption-request-dialog/adoption-request-dialog.component';
import {MyAddsComponent} from './components/Adds/my-adds/my-adds.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  // si no hay usuario logeado, no se puede entrar a main
  {path: 'header', component: HeaderComponent, canActivate: [AuthGuard]},
  {path: 'main', component: MainComponent},
  {path: 'toggle', component: MainTogglenavComponent},
  {path: 'publications', component: ViewAllPublicationsComponent},
  {path: 'subscriptions', component: SubscriptionsComponent},
  {path: 'profile', component: MyProfileComponent},
  {path: 'adoptionRequestDialog', component: AdoptionRequestDialogComponent},
  {path: 'adds', component: MyAddsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
