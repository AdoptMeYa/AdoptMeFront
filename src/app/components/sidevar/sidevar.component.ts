import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
  }
  seeAllPublicaions(): void{
    this.router.navigate(['publications']);
  }

  showSubscriptions(): void{
    this.router.navigate(['subscriptions']);
  }

  seeMyAllPublicaions(): void{
    this.router.navigate(['main']);
  }

  seeMyPerfil(): void{
    this.userService.currentUser = this.storageService.getCurrentUser().id;
    this.router.navigate(['profile']);
  }
  seeMyAdvertisements(): void{
  this.router.navigate(['adds']);
  }
  seeMyAdvertisementsWithPromotion(): void{
    this.router.navigate(['addsPromo']);
    }

  seeNotifications(): void{
    this.router.navigate(['notification']);
  }
}
