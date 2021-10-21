import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user.service';
import {StorageService} from '../../services/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  infUser: any;
  district: any;
  location: any;
  // tslint:disable-next-line:max-line-length
  constructor(public locationService: LocationService, public dialog: MatDialog, public userService: UserService, public storageService: StorageService){}

  ngOnInit(): void {
    this.getInfoCurrentUser();
  }
  // tslint:disable-next-line:typedef
  getDistrict(id): void {
    this.locationService.getLocation(id).subscribe(result => {
      this.district = result.district;
    });
    this.district.toString();
  }
  getInfoCurrentUser(): void{
    this.userService.getUserById(this.userService.currentUser).subscribe(
      res => {
        this.infUser = res;
        console.log(this.infUser);
        this.locationService.getLocation(this.infUser.districtId).subscribe(
          data => {
            console.log("hola");
            console.log(data.district);
            this.location = data.district
        });
    });
  }
  editForm(): void{
    this.dialog.open(FormUserDialogComponent);
  }

  ngOnDestroy(): void {
    this.userService.currentUser = this.storageService.getCurrentUser().id;
    console.log(this.infUser);
  }
}


@Component({
  selector: 'app-dialog-elements-example-dialog',
  template: `
    <div style="display: flex; flex-wrap: wrap; gap:20px; width: 430px">


          <mat-form-field appearance="standard">
            <mat-label>email</mat-label>
            <input  matInput #email [value]="infUser.email">
          </mat-form-field>

          <mat-form-field appearance="standard">
            <mat-label>password</mat-label>
            <input  matInput #password [value]="infUser.password">
          </mat-form-field>

          <mat-form-field appearance="standard">
            <mat-label>type</mat-label>
            <input  matInput #type [value]="infUser.type">
          </mat-form-field>

          <mat-form-field appearance="standard">
            <mat-label>user</mat-label>
            <input  matInput #user [value]="infUser.user">
          </mat-form-field>

          <mat-form-field appearance="standard">
            <mat-label>ruc</mat-label>
            <input  matInput #ruc [value]="infUser.ruc">
          </mat-form-field>

          <mat-form-field appearance="standard">
            <mat-label>dni</mat-label>
            <input  matInput #dni [value]="infUser.dni">
          </mat-form-field>


          <mat-form-field  appearance="standard">
            <mat-label>phone</mat-label>
            <input  matInput #phone [value]="infUser.phone">
          </mat-form-field>

          <mat-form-field appearance="standard">
            <mat-label>name</mat-label>
            <input  matInput #name [value]="infUser.name">
          </mat-form-field>


          <mat-form-field appearance="standard">
            <mat-label>last Name</mat-label>
            <input  matInput #lastName [value]="infUser.lastName">
          </mat-form-field>

          <mat-form-field appearance="standard">
            <mat-label>District</mat-label>
            <input  matInput #districtId [value]="location">
          </mat-form-field>



        <mat-card-actions>
          <button mat-button
                  (click)="save(email.value, password.value, type.value, user.value, ruc.value, dni.value, phone.value, name.value, lastName.value, this.infUser.districtId)">SAVE</button>
          <button mat-button  (click)="cancel()">CANCEL</button>

        </mat-card-actions>

    </div>
  `
})

export class FormUserDialogComponent implements OnInit {
  infUser: any;
  location: any;
  constructor(public dialog: MatDialog, private userService: UserService, private storageService: StorageService,
    private locationService: LocationService){}

  ngOnInit(): void {
    this.getInfoCurrentUser();
  }
  getInfoCurrentUser(): void{


    this.userService.getUserById(this.userService.currentUser).subscribe(
      res => {
        this.infUser = res;
        console.log(this.infUser);
        this.locationService.getLocation(this.infUser.districtId).subscribe(
          data => {
            console.log(data.district);
            this.location = data.district
        });
    });
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
