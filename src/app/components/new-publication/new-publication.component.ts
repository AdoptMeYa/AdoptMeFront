import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.css']
})
export class NewPublicationComponent implements OnInit {
  public PublishForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.PublishForm = this.formBuilder.group({
      Animal: ['', Validators.required],
      Name: ['', Validators.required],
      IsAtention: ['', Validators.required],
      Race: ['', Validators.required],
      Age: ['', Validators.required],
      Ubication: ['', Validators.required],
      Comment: ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if(this.PublishForm.valid){
      const Animal: string = this.PublishForm.value.Animal;
      const Name: string = this.PublishForm.value.Name;
      const IsAtention: string = this.PublishForm.value.IsAtention;
      const Race: string = this.PublishForm.value.Race;
      const Age: string = this.PublishForm.value.Age;
      const Ubication: string = this.PublishForm.value.Ubication;
      const Comment: string = this.PublishForm.value.Comment;

    }
  }

}
