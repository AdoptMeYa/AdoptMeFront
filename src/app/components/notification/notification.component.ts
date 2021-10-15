import { Component, OnInit } from '@angular/core';
import {AdoptionRequestService} from '../../services/adoption-request.service';
import {StorageService} from '../../services/storage.service';
import {UserService} from '../../services/user.service';
import {PublishService} from '../../services/publish.service';
import {PetsService} from '../../services/pets.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
 requests: [];
 users: [];
  publications: [];
  public pets: any;
  uerIdFrom: 0;
  useridAt: 0;
  constructor(
    private adoptionService: AdoptionRequestService,
    private storageService: StorageService,
    private userService: UserService,
    private publishService: PublishService,
    private petService: PetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.getRequests();
   this.getUsers();
   this.publishService.getPublication().subscribe((result) => {
     this.publications = result;
   });
   this.petService.ReadPets().subscribe((data) => {
     this.pets = data;
   });
  }
  // tslint:disable-next-line:typedef
  getUsers() {
    this.userService.getUser().subscribe((result) => {
      this.users = result;
    });
  }
  // tslint:disable-next-line:typedef
  getRequests() {
   this.adoptionService.getAdoptionRequest().subscribe((result) => {
     this.requests = result;
     this.uerIdFrom = result.uerIdFrom;
     this.useridAt = result.useridAt;
   });
  }

  // tslint:disable-next-line:typedef
  getCurrentIdUser() {
    return this.storageService.getCurrentUser().id;
  }
  // tslint:disable-next-line:typedef


  goToPerfil(id: number): void{
    this.userService.currentUser = id;
    this.router.navigate(['profile']);
  }
}
