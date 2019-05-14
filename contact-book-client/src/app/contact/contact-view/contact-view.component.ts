import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { StateInterfaceService } from '../../store/state-interface.service';
import { Contact, contactFactory } from '../contact.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {

  contactId: string;
  contact$: Observable<Contact>;
  contactModel: Contact;

  constructor(
      private stateService: StateInterfaceService,
      private route: ActivatedRoute,
      private fb: FormBuilder
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.contactId = params.id;

          if (this.isNew) {
              this.contactModel = contactFactory({});
          }
          else {
              this.contact$ = this.stateService.selectContact(this.contactId);
              this.loadContact(this.contactId).subscribe(contact => {
                  this.contactModel = contact
              });
          }
      });
  }

  loadContact(id: string): Observable<Contact> {
      return this.contact$.pipe(
          mergeMap(contact => {
              if (_.isEmpty(contact))                       // if contact is not loaded..
                  this.stateService.loadContact(id);        // ..load contact
              return of(contact);
          })
      );
  }

  saveContact(model: Contact) {
      if (this.isNew)
          this.createContact(model);
      else
          this.updateContact(this.contactId, model);
  }

  createContact(model: Contact) {
      this.stateService.createContact(model);
  }

  updateContact(id: string, model: Contact) {
      this.stateService.updateContact(id, model);
  }

  get isNew(): boolean {
      return this.contactId === 'new';
  }

}
