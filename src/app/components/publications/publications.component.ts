import { Component, OnInit } from '@angular/core';
import { PublishService } from '../../services/publish.service';
import { Publish } from '../../models/publish.model';
import { StorageService } from 'src/app/services/storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [DatePipe],
})
export class PublicationsComponent implements OnInit {
  names = [];
  Descriptions = [];
  public submitted: Boolean = false;
  public error: { code: number; message: string } = null;
  public listpublish: any;
  constructor(
    private publishService: PublishService,
    private storageservice: StorageService,
  ) {}
  ngOnInit(): void {
    this.publishService
      .listPublishByUserId(this.storageservice.getCurrentUser().id)
      .subscribe((data) => {
        this.listpublish = data;
        console.log(this.listpublish);
        this.names=this.listpublish
      });
  }

  onClick(id: number, i: number): void {
    console.log(this.listpublish[i].Name);
    alert("Publicación eliminada\nAdios " + (this.listpublish[i].Name).toString())
    
    this.publishService.deletePublishById(id).subscribe(
      data => this.correctDelete(data, id)
    );
  }
  private correctDelete(data: Publish, id: number){
    console.log('DELETE correcto');
    console.log(data);
    let index = this.names.findIndex(d => d.id === id);
    this.names.splice(index, 1); 
  }
}
