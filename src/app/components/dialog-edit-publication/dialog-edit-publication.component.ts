import { Component, Inject, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {PublishService} from '../../services/publish.service';
import { StorageService } from 'src/app/services/storage.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-edit-publication',
  templateUrl: './dialog-edit-publication.component.html',
  styleUrls: ['./dialog-edit-publication.component.css'],
  providers: [DatePipe]
})
export class DialogEditPublicationComponent implements OnInit {
  public EditPublishForm: FormGroup;
  public submitted: Boolean = false;
  public myDate = new Date();
  public error: {code: number, message: string} = null;
  public listpublish: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public info: any,
    private formBuilder: FormBuilder, 
    private publishService: PublishService,
    private datePipe: DatePipe,
    private storageservice: StorageService) { }
  
  ngOnInit(): void {
    console.log(this.info)
  
    this.EditPublishForm = this.formBuilder.group({
      Descripcion: [ '', Validators.required],
      Name: ['', Validators.required],
      IsAtention: ['', Validators.required],
      Race: ['', Validators.required],
      Ubication: ['', Validators.required],
      Comment: ['', Validators.required],
      Age: ['', Validators.required]
    });
  }
  onClick(): void{

  }
  onSubmit(): void {
    if (this.EditPublishForm.valid){
      const Descripcion: string = this.EditPublishForm.value.Descripcion;
      const Name: string = this.EditPublishForm.value.Name;
      const IsAtention: string = this.EditPublishForm.value.IsAtention;
      const Race: string = this.EditPublishForm.value.Race;
      const Age: string = this.EditPublishForm.value.Age;
      const Ubication: string = this.EditPublishForm.value.Ubication;
      const Comment: string = this.EditPublishForm.value.Comment;
      let fecha: string;
      fecha = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      
      let id : number;
      let iduser: number;

      this.publishService.editPublishById(id,Descripcion, Name, IsAtention, Race,
        Ubication, Comment, Age, iduser, fecha.toString() ).subscribe();
      
      console.log('Valido');
    }
    else {
      console.log("No Valido")
    }
  }
}