import { Component, OnInit } from '@angular/core';
import { PublishService } from '../../services/publish.service';
import { PetsService } from 'src/app/services/pets.service';
@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css']
})
export class ViewAllPublicationsComponent implements OnInit {
  names = [];
  indice = 0;
  public isEmpty = 1;
  public listpets: any;
  public aux: any;
  constructor(private publishService: PublishService,
    private petService: PetsService) { }

  ngOnInit(): void {
    this.publishService.getPublication().subscribe(result => {
      this.names = result;
      console.log(result);
      this.isEmpty = result.length;
    });
    this.petService.ReadPets().subscribe((data) => {
      this.listpets = data;
    })
  }

  filter(valor): void{
    this.indice = valor;
    console.log(valor);
  }

 

}
