import { Component, OnInit } from '@angular/core';
import { PublishService } from '../../services/publish.service';
import { PetsService } from 'src/app/services/pets.service';
import { StorageService } from '../../services/storage.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AdoptionRequestModel } from '../../models/AdoptionRequest.model';
import { AdoptionRequestService } from '../../services/adoption-request.service';
import {PublicationsDialogComponent} from "../publications-dialog/publications-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AdoptionRequestDialogComponent} from "../adoptionRequest-dialog/adoption-request-dialog/adoption-request-dialog.component";
import {Router} from '@angular/router';
@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css'],
})
export class ViewAllPublicationsComponent implements OnInit {
  names = [];
  indice = 0;
  userName = '';
  userIdAt = 0;
  listFinal: [{}];
  publicationId = 0;
  tzoffset = new Date().getTimezoneOffset() * 60000;
  localISOTime = new Date(Date.now() - this.tzoffset)
    .toISOString()
    .slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  public isEmpty = 1;
  adoptionRequest: AdoptionRequestModel = new AdoptionRequestModel();
  public submitted: boolean;
  public PublishForm: FormGroup;
  public listpets: any;
  public aux: any;
  constructor(
    private publishService: PublishService,
    private petService: PetsService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private adoptionRequestService: AdoptionRequestService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    (this.PublishForm = this.formBuilder.group({
      message: ['', Validators.required],
    })),
      this.getPublishandpets();
  }
  onSubmit() {}

  filter(valor): void {
    this.indice = valor;
    console.log(valor);
  }
  // tslint:disable-next-line:typedef
  getPublishandpets() {
    this.publishService.getPublication().subscribe((result) => {
      this.names = result;
      this.isEmpty = result.length;
      this.petService.ReadPets().subscribe((data) => {
        this.listpets = data;
        //console.log(this.listpets);
        this.unifiedData(this.names, this.listpets);
      });
    });
  }

  getCurrentIdUser() {
    return this.storageService.getCurrentUser().id;
  }



  onAdopt(userIdAt: number, publicationId: number): void {
    this.userService.getUserById(userIdAt).subscribe((result) => {
      this.userName = result.name;
      const dialogRef = this.dialog.open(AdoptionRequestDialogComponent, {
        width: '350px',
        data: {user_IdAt: userIdAt, publicationId_At: publicationId, userNameAt: this.userName}
      });
      console.log(publicationId + 'from' + this.userName);
    });
    this.userIdAt = userIdAt;
    this.publicationId = publicationId;
  }



  filter2(kindanimal, gender, require): void {
    this.petService
      .filterPets(kindanimal, gender, require)
      .subscribe((data) => {
        this.listpets = data;
      });
  }

  unifiedData(publicaciones, pets) {
    for (const i in publicaciones) {
      for (const j in pets) {
        if (publicaciones[i].id === pets[j].publicationId) {
          console.log(publicaciones[i],pets[j])
        }
      }
    }
  }

  goToPerfil(id: number): void{
    this.userService.currentUser = id;
    this.router.navigate(['profile']);
  }
}
