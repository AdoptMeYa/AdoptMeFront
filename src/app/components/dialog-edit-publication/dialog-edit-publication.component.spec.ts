import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPublicationComponent } from './dialog-edit-publication.component';

describe('DialogEditPublicationComponent', () => {
  let component: DialogEditPublicationComponent;
  let fixture: ComponentFixture<DialogEditPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
