import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PublishService } from '../../services/publish.service';
import { Publish } from '../../models/publish.model';
import { StorageService } from 'src/app/services/storage.service';
import { DatePipe } from '@angular/common';
import { NewPublicationComponent } from 'src/app/components/new-publication/new-publication.component';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [DatePipe],
})
export class PublicationsComponent implements OnInit {
  names = [];
  Descriptions = [];
  public PublishForm: FormGroup;
  public submitted: Boolean = false;
  public error: { code: number; message: string } = null;
  public myDate = new Date();
  public listpublish: any;
  constructor(
    private formBuilder: FormBuilder,
    private publishService: PublishService,
    private storageservice: StorageService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.PublishForm = this.formBuilder.group({
      Descripcion: ['', Validators.required],
      Name: ['', Validators.required],
      IsAtention: ['', Validators.required],
      Race: ['', Validators.required],
      Ubication: ['', Validators.required],
      Comment: ['', Validators.required],
      Age: ['', Validators.required],
    });

    this.publishService
      .listPublishByUserId(this.storageservice.getCurrentUser().id)
      .subscribe((data) => {
        this.listpublish = data;
        console.log(this.listpublish);
        //this.names.push(JSON.stringify(this.listpublish));
        this.names=this.listpublish
        
      });
  }

  onClick(): void {
    this.publishService.deletePublishById(4).subscribe(
      data => this.correctDelete(data)
    );

  }

  private correctDelete(data: Publish){
    console.log('DELETE correcto');
    console.log(data);
  }
}
