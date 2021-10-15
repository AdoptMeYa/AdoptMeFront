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
  //variables publication/districts/pets
  public names = [];
  public districts: any;
  public listpets: any;
  public listUsers: any;
  //form autocmplete
  myControl = new FormControl();
  options: string[] = [];

  constructor(
    private publishService: PublishService,
    private petService: PetsService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private adoptionRequestService: AdoptionRequestService,
    private districtService: DistrictService
  ) {}

  ngOnInit(): void {
    (this.PublishForm = this.formBuilder.group({
      message: ['', Validators.required],
    })),
      this.districtService.getAllDistricts().subscribe((then) => {
        for (const i in then) {
          if (then.hasOwnProperty(i)) {
            var value = then[i];
            this.options.push(value.district); //do something with value;
          }
        }
      });

    this.getAllData();
  }
  onSubmit() {}
  getAllData() {
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
      //console.log(publicationId + 'from' + this.userName);
    });
    this.userIdAt = userIdAt;
    this.publicationId = publicationId;
  }

  sendAdoptionRequest() {
    if (this.PublishForm.value.message !== '') {
      this.adoptionRequest.uerIdFrom = this.getCurrentIdUser();
      this.adoptionRequest.useridAt = this.userIdAt;
      this.adoptionRequest.message = this.PublishForm.value.message;
      this.adoptionRequest.publicationId = this.publicationId;
      this.adoptionRequest.date = this.date;
      this.adoptionRequestService
        .postAdoptionRequest(this.adoptionRequest)
        .subscribe();
      alert('Adoption Request Sent to ' + this.userName);
    }
  }

  filter2(kindanimal, gender, require) {
    if (
      kindanimal === '' &&
      gender === '' &&
      require === '' &&
      this.myControl.value === ''
    ) {
      console.log('NADA');
    }else if(this.myControl.value || (kindanimal === '' && gender === '' &&require === '' ))
    {
      this.districtService
        .getDistrictByName(this.myControl.value)
        .subscribe((data) => {
          this.districts = data;
        });
    }
    else {
      this.petService
        .filterPets(kindanimal, gender, require)
        .subscribe((data) => {
          this.listpets = data;
        });
      this.districtService
        .getDistrictByName(this.myControl.value)
        .subscribe((data) => {
          this.districts = data;
        });
    }
  }
}
