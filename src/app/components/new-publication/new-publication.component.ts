import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {PublishService} from '../../services/publish.service';
import {Publish} from '../../models/publish.model';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.css']
})
export class NewPublicationComponent implements OnInit {
  public PublishForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder, private publishService: PublishService ) { }

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
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.PublishForm.valid){
      const Descripcion: string = this.PublishForm.value.Descripcion;
      const Name: string = this.PublishForm.value.Name;
      const IsAtention: string = this.PublishForm.value.IsAtention;
      const Race: string = this.PublishForm.value.Race;
      const Age: string = this.PublishForm.value.Age;
      const Ubication: string = this.PublishForm.value.Ubication;
      const Comment: string = this.PublishForm.value.Comment;

      this.publishService.createFormPublish(Descripcion, Name, IsAtention, Race, Age,
        Ubication, Comment).subscribe(
        data => this.correctPublishForm(data)
      );
      console.log('Valido');
    }



  }
  private correctPublishForm(data: Publish){
    console.log('Publish correcto');
    console.log(data);
  }
}
