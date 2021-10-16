import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../../../services/advertisement.service';
import {StorageService} from '../../../services/storage.service';
import {AdvertisementModel} from '../../../models/Advertisement.model';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../my-adds-dialogs/add-dialog/add-dialog.component';
import {EditDialogComponent} from '../my-adds-dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-my-adds',
  templateUrl: './my-adds.component.html',
  styleUrls: ['./my-adds.component.css']
})
export class MyAddsComponent implements OnInit {
  public Adds: any;

  public advertisement: AdvertisementModel = new AdvertisementModel();
  constructor(
    private advertisementService: AdvertisementService,
    public storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
        this.advertisementService.listAdvertisementsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
      // tslint:disable-next-line:forin
        for (const i in data){
        this.Adds = data;
        console.log(this.Adds);
      }
    });


  }
     openDialogAdd(Add){
       const dialogRef = this.dialog.open(AddDialogComponent, {
         width: '350px',
       });
       dialogRef.afterClosed().subscribe(result => {
         console.log('The dialog was closed');
         this.advertisementService.listAdvertisementsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
           // tslint:disable-next-line:forin
           for (const i in data){
             this.Adds = data;
           }
         });
       });
     }


  // tslint:disable-next-line:typedef
  editAdvertisement(edit, arrAdds){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '350px',
      data: {arrayAdds: arrAdds}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.advertisementService.listAdvertisementsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
        // tslint:disable-next-line:forin
        for (const i in data){
          this.Adds = data;
        }
      });
    });
  }
  deleteAdvertisement(id: number){
  this.advertisementService.deleteAdvertisement(id).subscribe(res => {
    alert('Advertisement deleted');
    this.advertisementService.listAdvertisementsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
      // tslint:disable-next-line:forin
      for (const i in data){
        this.Adds = data;
      }
    });
  });
  }
}
