import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import {Router} from "@angular/router";
import { StorageService} from './../../services/storage.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: User;
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }
  getUser(): any {
    return this.storageService.getCurrentUser();
  }
  logout(){
    this.storageService.logout();
    this.router.navigate(['login'])
  }
}