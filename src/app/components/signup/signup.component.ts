import {Component, OnInit } from "@angular/core";
import {Validators, FormGroup, FormBuilder } from "@angular/forms";
import {AuthService} from "./../../services/auth.service";
import {Router} from "@angular/router";
import { Session } from "../../models/session.model";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public submitted: Boolean = false;
  selection: string = "cliente";
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      type: ['', [Validators.required]],
      ruc: ['', [Validators.pattern('^((?!(10))[0-9]{11})$')]],
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8}$')]],
      phone: ['', [Validators.pattern("^[0-9\-\+]{9,15}$")]]
    })
    this.signupForm.controls['ruc'].disable()
  }
  disable($event){
    if ($event == "cliente") {
      this.signupForm.controls['ruc'].disable()
    }
    else{
      this.signupForm.controls['ruc'].enable()
    }
    return $event;
  }
  onSubmit(): void {
    this.submitted = true;
    console.log("click signup")
    
      let name: string = this.signupForm.value.name;
      let lastname: string = this.signupForm.value.lastname;
      let email: string = this.signupForm.value.email;
      let password: string = this.signupForm.value.password;
      let type: string = this.selection;
      let ruc: string = this.signupForm.value.ruc;
      let dni: string = this.signupForm.value.dni;
      let phone: string = this.signupForm.value.phone
  
      let user: string = "basic";
      let locationId: number = 0;
      this.authenticationService.signup(name, lastname, email, password, type, user, ruc, dni, phone, locationId).subscribe(
        data => this.correctSignup(data)
      )
    
  }
  private correctSignup(data: Session){
    console.log("signup correcto");
    console.log(data);
    this.router.navigate(['login'])
  }
}