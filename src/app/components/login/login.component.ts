import {Component, OnInit } from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "./../../services/auth.service";
import { StorageService} from './../../services/storage.service';
import {Router} from "@angular/router";
import { Session, SessionContainer } from "../../models/session.model";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private router: Router,
              private storageService: StorageService) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onSubmit(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      let email: string = this.loginForm.value.email;
      let password: string = this.loginForm.value.password;
      console.log("click login")
      this.authenticationService.login(email, password).subscribe(
        data => this.correctLogin(data)
        //error => this.error = JSON.parse(error._body)
      )
    }
  }
  private correctLogin(data: Session){
    console.log("login correcto");
    if (data.user) {
      console.log("Json del usuario que hizo login")
      console.log(data.user)
      this.storageService.setCurrentSession(data);
      console.log(data)
      this.router.navigate(['main']);
    }
  }
}