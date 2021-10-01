import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import {Router} from '@angular/router';
import { StorageService} from '../../services/storage.service';
import { PublishService } from '../../services/publish.service';
import { Publish } from '../../models/publish.model';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DatePipe],
})
export class MainComponent implements OnInit {
  public user: User;
  public isEmpty = 1;
  date = new Date();
  public PublishForm: FormGroup;
  publishmodel: Publish = new Publish();
  names = [];
  employeeData !: any;
  Descriptions = [];
  public submitted: boolean;
  public error: string = null;
  public listpublish: any;
  public myDate = new Date();
  constructor(
    private storageService: StorageService,
    private router: Router,
    private publishService: PublishService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.PublishForm = this.formBuilder.group({
      Descripcion: ['', Validators.required],
      Name: ['', Validators.required],
      IsAtention: ['', Validators.required],
      Race: ['', Validators.required],
      Ubication: ['', Validators.required],
      Comment: ['', Validators.required],
      Age: ['', Validators.required]
    }),
      this.publishService
        .listPublishByUserId(this.storageService.getCurrentUser().id)
        .subscribe((data) => {
          this.listpublish = data;
          this.names = this.listpublish;
          this.isEmpty = data.length;
          console.log(this.isEmpty);
        });
  }
  getUser(): any {
    return this.storageService.getCurrentUser();
  }
  logout(): void{
    this.storageService.logout();
    this.router.navigate(['login']);
  }
  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    /*
    funciona esta cosa
     */
    if (this.PublishForm.valid){
      this.publishmodel.descripcion = this.PublishForm.value.Descripcion;
      this.publishmodel.Name = this.PublishForm.value.Name;
      this.publishmodel.IsAtention = this.PublishForm.value.IsAtention;
      this.publishmodel.Race = this.PublishForm.value.Race;
      this.publishmodel.Age = this.PublishForm.value.Age;
      this.publishmodel.Ubication = this.PublishForm.value.Ubication;
      this.publishmodel.Commnet = this.PublishForm.value.Comment;
      let fecha: string;
      fecha = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      const iduser = this.storageService.getCurrentUser().id;
      this.publishService.createFormPublish(this.publishmodel.descripcion, this.publishmodel.Name,
        this.publishmodel.IsAtention, this.publishmodel.Race,
        this.publishmodel.Ubication, this.publishmodel.Commnet, this.publishmodel.Age, iduser, fecha.toString()).subscribe(
        data => this.correctPublishForm(data)
      );
      console.log('Valido');
      alert('Pet added succesfully');
    }
    else {
      console.log('No Valido');
      this.error = "Ingrese los datos correctamente";
    }
    this.publishService
      .listPublishByUserId(this.storageService.getCurrentUser().id)
      .subscribe((data) => {
        this.listpublish = data;
        console.log(this.listpublish);
        this.names = this.listpublish;
      });
  }

  private correctPublishForm(data: Publish): void{
    console.log('Publish correcto');
    console.log(data);
  }
  deletePublication(name: any, id: number, i: number): void{
    this.publishService.deletePublishById(name.id).subscribe(res => {
      alert('Publication deleted');
      });
    console.log(id);
    console.log(i);
    const index = this.names.findIndex(d => d.id === name.id);
    this.names.splice(index, 1);
  }

  seeAllPublicaions(): void{
    this.router.navigate(['publications']);
  }

  showSubscriptions(): void{
    this.router.navigate(['subscriptions']);
  }
  onEdit(row: any): void{
    this.publishmodel.id = row.id;
    this.PublishForm.controls['Descripcion'.toString()].setValue(row.descripcion);
    this.PublishForm.controls['Name'.toString()].setValue(row.Name);
    this.PublishForm.controls['IsAtention'.toString()].setValue(row.IsAtention);
    this.PublishForm.controls['Race'.toString()].setValue(row.Race);
    this.PublishForm.controls['Ubication'.toString()].setValue(row.Ubication);
    this.PublishForm.controls['Comment'.toString()].setValue(row.Commnet);
    this.PublishForm.controls['Age'.toString()].setValue(row.Age);
  }

  getAllPublications(): void{
    this.publishService.getPublication().subscribe(res => {
      this.employeeData = res;
    });
  }
  updatePublication(): void{
    console.log('Actualizando...');
    this.publishmodel.descripcion = this.PublishForm.value.Descripcion;
    this.publishmodel.Name = this.PublishForm.value.Name;
    this.publishmodel.IsAtention = this.PublishForm.value.IsAtention;
    this.publishmodel.Race = this.PublishForm.value.Race;
    this.publishmodel.Age = this.PublishForm.value.Age;
    this.publishmodel.Ubication = this.PublishForm.value.Ubication;
    this.publishmodel.Commnet = this.PublishForm.value.Comment;
    this.publishmodel.IdUser = this.storageService.getCurrentUser().id;
    this.publishmodel.Fecha = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    this.publishService.updatePublishbyId(this.publishmodel, this.publishmodel.id)
      .subscribe(res => {
        alert('Publication updated');
        this.PublishForm.reset();
        this.getAllPublications();
      });
    this.publishService
      .listPublishByUserId(this.storageService.getCurrentUser().id)
      .subscribe((data) => {
        this.listpublish = data;
        console.log(this.listpublish);
        console.log('lol');
        this.names = this.listpublish;
      });


  }
}
