import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent implements OnInit {

  constructor(private router: Router) { }

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
    this.router.navigate(['profile']);
  }

}
