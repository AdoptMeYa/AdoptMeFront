import {Component, OnInit } from "@angular/core";
import {Validators, FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import {AuthService} from "./../../services/auth.service";
import {Router} from "@angular/router";
import { Session } from "../../models/session.model";
import { ErrorStateMatcher } from "@angular/material/core";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public type_user: any[] = ['Client', 'Veterinarian', 'Supplier'];
  public signupForm: FormGroup;
  public submitted: Boolean = false;
  selection: string = "Client";
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
  disable(val: any){
    if (val != "Client") {
      this.signupForm.controls['ruc'].enable()
    }
    else{
      this.signupForm.controls['ruc'].disable()
    }
  }
  onSubmit(): void {
    this.submitted = true;
    console.log("click signup")
    console.log(this.signupForm.value)
    if (this.signupForm.valid){
    
      let name: string = this.signupForm.value.name;
      let lastname: string = this.signupForm.value.lastname;
      let email: string = this.signupForm.value.email;
      let password: string = this.signupForm.value.password;
      let type: string = this.signupForm.value.type;
      let ruc: string = this.signupForm.value.ruc;
      let dni: string = this.signupForm.value.dni;
      let phone: string = this.signupForm.value.phone
  
      let user: string = "basic";
      let locationId: number = 0;
      this.authenticationService.signup(name, lastname, email, password, type, user, ruc, dni, phone, locationId).subscribe(
        data => this.correctSignup(data)
      )
    }
    
  }
  private correctSignup(data: Session){
    console.log("signup correcto");
    console.log(data);
    this.router.navigate(['login'])
  }
}