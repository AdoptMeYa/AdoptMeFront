import {Component, OnInit} from '@angular/core';
import {PublishService} from '../../services/publish.service';
import {PetsService} from 'src/app/services/pets.service';
import {StorageService} from '../../services/storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AdoptionRequestModel} from '../../models/AdoptionRequest.model';
import { MatDialog } from '@angular/material/dialog';
import {AdoptionRequestService} from '../../services/adoption-request.service';
import {AdoptionRequestDialogComponent} from '../adoptionRequest-dialog/adoption-request-dialog/adoption-request-dialog.component';

@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css']
})
export class ViewAllPublicationsComponent implements OnInit {
  names = [];
  indice = 0;
  userName = '';
  userIdAt = 0;
  publicationId = 0;
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  public isEmpty = 1;
  adoptionRequest: AdoptionRequestModel = new AdoptionRequestModel();
  public submitted: boolean;
  public PublishForm: FormGroup;
  public listpets: any;
  public aux: any;
  constructor(private publishService: PublishService,
              private petService: PetsService, private storageService: StorageService , private formBuilder: FormBuilder,
              private userService: UserService, private adoptionRequestService: AdoptionRequestService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.PublishForm = this.formBuilder.group({
      message: ['', Validators.required],
    }),
    this.publishService.getPublication().subscribe(result => {
      this.names = result;
      console.log(result);
      this.isEmpty = result.length;
    });
    this.petService.ReadPets().subscribe((data) => {
      this.listpets = data;
    });
  }

  filter(valor): void{
    this.indice = valor;
    console.log(valor);
  }
  // tslint:disable-next-line:typedef
  getCurrentIdUser(){
    return this.storageService.getCurrentUser().id;
  }

   onAdopt(message, userIdAt: number, publicationId: number){
     this.userService.getUserById(userIdAt).subscribe(result => {
       this.userName = result.name;
       console.log(publicationId + 'from' + this.userName);
       const dialogRef = this.dialog.open(AdoptionRequestDialogComponent, {
         width: '550px',
         data : {info: message, userId_At: userIdAt, publicationIdAt: publicationId, userNameAt: this.userName}
       });
     });
     this.userIdAt = userIdAt;
     this.publicationId = publicationId;

 }
}
