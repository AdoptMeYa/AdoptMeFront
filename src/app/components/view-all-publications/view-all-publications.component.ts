import { Component, OnInit } from '@angular/core';
import { PublishService } from '../../services/publish.service';

@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css']
})
export class ViewAllPublicationsComponent implements OnInit {
  names = [];
  indice = 0;
  public isEmpty = 1;
  constructor(private publishService: PublishService) { }

  ngOnInit(): void {
    this.publishService.getPublication().subscribe(result => {
      this.names = result;
      console.log(result);
      this.isEmpty = result.length;
    });
  }

  filter(valor): void{

    this.indice = valor;
    this.filter2(valor);
    console.log(valor);
  }

  filter2(val): void{
    this.publishService.getPublication().subscribe(result => {
      this.names = [];

      for (let res in result) {
        if (result[res].Age === val){
          this.names.push(result[res]);
        }
      }
      this.isEmpty = result.length;
    });
  }


}
