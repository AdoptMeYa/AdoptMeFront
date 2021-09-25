import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/AuthGuard';
import {NewPublicationComponent} from './components/new-publication/new-publication.component';
import {PublicationsComponent } from './components/publications/publications.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'Publication', component: NewPublicationComponent},
  // si no hay usuario logeado, no se puede entrar a main
  {path:'main', component: MainComponent, canActivate: [AuthGuard]},
  {path:'PublicationsMain',component: PublicationsComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
