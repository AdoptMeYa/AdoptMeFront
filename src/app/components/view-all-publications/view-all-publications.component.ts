import { Component, OnInit } from '@angular/core';
import { PublishService } from '../../services/publish.service';

@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css']
})
export class ViewAllPublicationsComponent implements OnInit {
  names = [];
  constructor(private publishService: PublishService) { }

  ngOnInit(): void {
    this.publishService.getPublication().subscribe(result => {
      this.names = result;
      console.log(result);
    });
  }

}
