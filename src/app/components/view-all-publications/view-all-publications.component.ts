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
import { AdoptionRequestModel } from '../../models/AdoptionRequest.model';
import { AdoptionRequestService } from '../../services/adoption-request.service';
import { UserService } from '../../services/user.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DistrictService } from '../../services/district.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { PublicationsDialogComponent } from '../publications-dialog/publications-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdoptionRequestDialogComponent } from '../adoptionRequest-dialog/adoption-request-dialog/adoption-request-dialog.component';
import {Router} from '@angular/router';
import { PublicationModel } from '../../models/publication.model';
import { Pet } from '../../models/pet.model';
import {FilterService} from '../../services/filter.service';



@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css'],
})
export class ViewAllPublicationsComponent implements OnInit {
  indice = 0;
  userName = '';
  userIdAt = 0;
  publicationId = 0;
  tzoffset = new Date().getTimezoneOffset() * 60000;
  localISOTime = new Date(Date.now() - this.tzoffset)
    .toISOString()
    .slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  adoptionRequest: AdoptionRequestModel = new AdoptionRequestModel();
  public isEmpty = 1;
  public submitted: boolean;
  public PublishForm: FormGroup;
  dataPrueba: 'barranco';
  public aux: any;
  // variables publication/districts/pets
  public names = [];
  public districts: any;
  public listpets: any;
  public listUsers: any;
  // form autocmplete
  myControl = new FormControl();
  options: string[] = [];
  // variables temporales
  publishCollection = [];
  petCollection: Pet[];
  publicationModelArray: PublicationModel[] = [];
  publicationArray: PublicationModel[];

  constructor(
    private router: Router,
    private publishService: PublishService,
    private petService: PetsService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private adoptionRequestService: AdoptionRequestService,
    private districtService: DistrictService,
    private dialog: MatDialog,
    public filterService: FilterService
  ) {}

  ngOnInit(): void {

    this.getPublicationCollection();
    this.getPetCollection();

  }
  toFilter(kindanimal, gender, attention): void{
    this.filterService.getPets(kindanimal, gender, attention).subscribe(
      result => {
        this.petCollection = result;
        console.log(this.petCollection);
        this.publicationArray.length = 0;
        this.filterPetProps();
      }
    );
  }
  filterPetProps(): void{
    for (const publish of this.publishCollection){
      for (const pet of this.petCollection){
        if (publish.id === pet.publicationId){
          this.publicationModelArray.push(new PublicationModel(
            publish.id, pet.id, pet.name, publish.comment, publish.dateTime,
            pet.race, pet.attention, pet.age, pet.gender, 'sad'
          ));
          break;
        }
      }
      this.publicationArray = this.publicationModelArray;
    }
  }
  getPublicationCollection(): void{
    this.publishService.listPublish().subscribe(
      result => {
        this.publishCollection = result;
      }
    );
  }
  getPetCollection(): void{
    this.petService.ReadPets().subscribe(
      result => {
        this.petCollection = result;
        this.filterPetProps();
        console.log(this.publicationArray);
      }
    );

  }
  getAllData(): void{
    this.publishService.getPublication().subscribe((result) => {
      this.names = result;
      this.isEmpty = result.length;
      this.petService.ReadPets().subscribe((data) => {
        this.listpets = data;
        this.districtService.getAllDistricts().subscribe((districts) => {
          this.districts = districts;
          this.userService.getallUser().subscribe((users) => {
            this.listUsers = users;
          });
        });
      });
    });
  }

  getCurrentIdUser() {
    return this.storageService.getCurrentUser().id;
  }

  onAdopt(userIdAt: number, publicationId: number) {
    this.userService.getUserById(userIdAt).subscribe((result) => {
      this.userName = result.name;
      const dialogRef = this.dialog.open(AdoptionRequestDialogComponent, {
        width: '350px',
        data: {
          user_IdAt: userIdAt,
          publicationId_At: publicationId,
          userNameAt: this.userName,
        },
      });
    });
    this.userIdAt = userIdAt;
    this.publicationId = publicationId;
  }

  goToPerfil(id): void{
    this.userService.currentUser = id;
    console.log(id);
    this.router.navigate(['profile']);
  }
  filter2(kindanimal, gender, require): void {
    if (!kindanimal && !gender && !require && !this.myControl.value) {
      console.log('Nothing to filter');
    } else if (
      this.myControl.value ||
      (kindanimal === '' && gender === '' && require === '')
    ) {
      this.districtService
        .getDistrictByName(this.myControl.value)
        .subscribe((data) => {
          this.districts = data;
        });

      if (kindanimal || gender || require) {
        console.log('hhh');

        this.districtService
          .getDistrictByName(this.myControl.value)
          .subscribe((data) => {
            this.districts = data;

            console.log(data);

            this.petService
              .filterPets(kindanimal, gender, require)
              .subscribe((dat) => {
                this.listpets = dat;
              });
          });
      }
    } else if (this.myControl.value && (kindanimal || gender || require)) {
    } else {
      if (this.myControl.value) {
        console.log('dad');
        this.districtService
          .getDistrictByName(this.myControl.value)
          .subscribe((dat) => {
            this.districts = dat;
          });
      } else {
        this.petService
          .filterPets(kindanimal, gender, require)
          .subscribe((data) => {
            this.listpets = data;
          });
      }
    }
  }
}
