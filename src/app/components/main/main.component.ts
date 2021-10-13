import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { StorageService} from '../../services/storage.service';
import { PublishService } from '../../services/publish.service';
import { PetsService } from '../../services/pets.service';
import { MatDialog } from '@angular/material/dialog';
import { PublicationsDialogComponent } from '../publications-dialog/publications-dialog.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public isEmpty = 1;
  names = [];
  public listpublish: any;
  public listpets: any;
  npets = [];
  constructor(
    private storageService: StorageService,
    private router: Router,
    private publishService: PublishService,
    private petService: PetsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.publishService.listPublishByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
      this.listpublish = data;
      this.names = this.listpublish;
      this.isEmpty = data.length;
    });
    this.petService.ReadPetsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
      this.listpets = data;
      this.npets = this.listpets;
    });
  }
  openDialog(message): void{
    const dialogRef = this.dialog.open(PublicationsDialogComponent, {
      width: '350px',
      data: {info: message}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.publishService.listPublishByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
        this.listpublish = data;
        this.names = this.listpublish;
        this.petService.ReadPetsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
          this.listpets = data;
          this.npets = this.listpets;
        });
      });
    });
  }
  //inicia dialog formulario
  openDialog2(message, arrPub, arrPets): void{
    const dialogRef = this.dialog.open(PublicationsDialogComponent, {
      width: '350px',
      data: {info: message, arrPub: arrPub, arrPets: arrPets}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.publishService.listPublishByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
        this.listpublish = data;
        this.names = this.listpublish;
        this.petService.ReadPetsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
          this.listpets = data;
          this.npets = this.listpets;
        });
      });
    });
  }
  //termina
  deletePublication(name: any): void{
    this.publishService.deletePublishById(name.id).subscribe(data => {
      alert('Publication deleted');
      this.petService.ReadPetsByPublicationId(data.id).subscribe(cip =>{
        this.petService.DeletePet(cip.id).subscribe()
      })
    });
    const index = this.names.findIndex(d => d.id === name.id);
    this.names.splice(index, 1);
  }
  seeAllPublicaions(): void{
    this.router.navigate(['publications']);
  }
  showSubscriptions(): void{
    this.router.navigate(['subscriptions']);
  }
}
