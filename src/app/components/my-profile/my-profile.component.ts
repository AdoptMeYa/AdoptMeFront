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
  ngOnDestroy(): void{
    this.userService.currentUser = this.storageService.getCurrentUser().id;
  }
  // tslint:disable-next-line:typedef
  getInfoCurrentUser(): void{
    this.userService.getUserById(this.userService.currentUser).subscribe(
      data => {
        this.infUser = data;
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
                (click)="save(email.value, password.value, type.value, user.value, ruc.value, dni.value, phone.value, name.value, lastName.value, districtId.value)">SAVE</button>
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


    this.userService.getUserByIdToForm(this.userService.currentUser).subscribe(
      res => {
        this.infUser = res;
        console.log(this.infUser);
        this.locationService.getLocationToForm(this.infUser.districtId).subscribe(
          data => {
            console.log(data.district);
            this.location = data.district
          });
      });
  }
  save(email, password, type, user, ruc, dni, phone, name, lastName, districtId): void{
    //this.dialog.closeAll();
    console.log(districtId);
    let locationId: any = 0;
    switch (districtId) {
      case 'Ventanilla':
        locationId = 0
        break;
      case 'Barranco':
        locationId = 1
        break
      case 'Miraflores':
        locationId = 2
        break
      case 'Surquillo':
        locationId = 3
        break
      case "San Isidro":
        locationId = 4
        break
      case 'Callao':
        locationId = 5
        break
      case 'Chorrillos':
        locationId = 6
        break
      case 'Comas':
        locationId = 7
        break
      case "Jesus Maria":
        locationId = 8
        break
      case "La Molina":
        locationId = 9
        break
      case "La Victoria":
        locationId = 10
        break
      case 'Lima':
        locationId = 11
        break
      case 'Lince':
        locationId = 12
        break
      case "Los Olivos":
        locationId = 13
        break
      case 'Lurin':
        locationId = 14
        break
      case "Puenta Piedra":
        locationId = 15
        break
      case "Rimac":
        locationId = 16
        break
      case "Santiago de Surco":
        locationId = 17
        break
      case "San Borja":
        locationId = 18
        break
      case "San Isidro":
        locationId = 19
        break
      case "San Juan de Lurigancho":
        locationId = 20
        break
      case "San Juan de Miraflores":
        locationId = 21
        break
      case "San Martin de Porres":
        locationId = 22
        break
      case "San Isidro":
        locationId = 23
        break
      case "Ventanilla":
        locationId = 24
        break
      case "Villa El Salvador":
        locationId = 25
        break
      default:
        break;
    }
    districtId = locationId;


    this.userService.putUser(this.storageService.getCurrentUser().id,
      {email, password, type, user, ruc, dni, phone, name, lastName, districtId}).subscribe(
      this.getInfoCurrentUser
  );
    this.dialog.closeAll();
  }

  cancel(): void{
    this.dialog.closeAll();
  }
}
