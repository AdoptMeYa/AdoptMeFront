import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: User;
  constructor(
    private authenticationService: AuthService
  ) { }

  ngOnInit(): void {
    
  }
}