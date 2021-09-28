import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Reactive Forms
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// angular materail
import { MaterialModule } from './material.module';
// components
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
// services
import { AuthService } from './services/auth.service'
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
// guards
import { AuthGuard } from './guards/AuthGuard';
// interceptor
import { AuthInterceptor } from './interceptor/AuthInterceptor';
import {NewPublicationComponent} from './components/new-publication/new-publication.component';
import {PublishService} from './services/publish.service';
import { PublicationsComponent } from './components/publications/publications.component';
import { DialogEditPublicationComponent } from './components/dialog-edit-publication/dialog-edit-publication.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    NewPublicationComponent,
    PublicationsComponent,
    DialogEditPublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService, StorageService, AuthGuard, UserService, PublishService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
