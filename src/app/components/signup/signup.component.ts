import {Component, OnInit } from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "./../../services/auth.service";
import {Router} from "@angular/router";
import { Session, SessionContainer } from "../../models/session.model";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;
    if(this.signupForm.valid){
      let email: string = this.signupForm.value.email;
      let password: string = this.signupForm.value.password;
      console.log("click signup")
      this.authenticationService.signup(email, password).subscribe(
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