import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {StorageService} from '../../services/storage.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  infUser: any;
  constructor(public dialog: MatDialog, public userService: UserService, public storageService: StorageService){}

  ngOnInit(): void {
    this.getInfoCurrentUser();
  }
  getInfoCurrentUser(): void{
    
   
    this.infUser = this.storageService.getCurrentUser();
    console.log(this.infUser);
  }
  editForm(): void{
    this.dialog.open(FormUserDialogComponent);
  }
}

@Component({
  selector: 'app-dialog-elements-example-dialog',
  template: `
    <div style='flex-direction: column' class="form">

      <div style='flex-direction: column;justify-content:center; '>

        <div style="justify-content:center">
          <mat-form-field appearance="fill">
            <mat-label>email</mat-label>
            <input  matInput #email [value]="infUser.email">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>password</mat-label>
            <input  matInput #password [value]="infUser.password">
          </mat-form-field>
        </div>

        <div style="justify-content:center">
          <mat-form-field appearance="fill">
            <mat-label>type</mat-label>
            <input  matInput #type [value]="infUser.type">
          </mat-form-field>
          <span></span>
          <mat-form-field appearance="fill">
            <mat-label>user</mat-label>
            <input  matInput #user [value]="infUser.user">
          </mat-form-field>
        </div>

        <div style="justify-content:center">
          <mat-form-field appearance="fill">
            <mat-label>ruc</mat-label>
            <input  matInput #ruc [value]="infUser.ruc">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>dni</mat-label>
            <input  matInput #dni [value]="infUser.dni">
          </mat-form-field>
        </div>

        <div style="justify-content:center">

          <mat-form-field  appearance="fill">
            <mat-label>phone</mat-label>
            <input  matInput #phone [value]="infUser.phone">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>name</mat-label>
            <input  matInput #name [value]="infUser.name">
          </mat-form-field>

        </div>

        <div style="justify-content:center">
          <mat-form-field appearance="fill">
            <mat-label>last Name</mat-label>
            <input  matInput #lastName [value]="infUser.lastName">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>District Id</mat-label>
            <input  matInput #districtId [value]="infUser.districtId">
          </mat-form-field>
        </div>


        <div>
        <mat-action-row style="justify-content: center">
          <button class="btn btn-primary"
                  (click)="save(email.value, password.value, type.value, user.value, ruc.value, dni.value, phone.value, name.value, lastName.value, districtId.value )">SAVE</button>
          <button class="btn btn-primary" (click)="cancel()">CANCEL</button>
        </mat-action-row>
        </div>
      </div>
    </div>
  `
})

export class FormUserDialogComponent implements OnInit {
  infUser: any;
  constructor(public dialog: MatDialog, private userService: UserService, private storageService: StorageService){}

  ngOnInit(): void {
    this.getInfoCurrentUser();
  }
  getInfoCurrentUser(): void{
    this.infUser = this.storageService.getCurrentUser();
    console.log(this.infUser);
  }
  save(email, password, type, user, ruc, dni, phone, name, lastName, districtId): void{
    this.dialog.closeAll();
    console.log(email);
    this.userService.putUser(this.storageService.getCurrentUser().id,
      {email, password, type, user, ruc, dni, phone, name, lastName, districtId});
  }
  cancel(): void{
    this.dialog.closeAll();
  }
}
