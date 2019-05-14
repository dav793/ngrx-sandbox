import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {StateInterfaceService} from "../../store/state-interface.service";

import {Contact} from "../contact.model";

import * as _ from 'lodash';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {

  contacts$: Observable<{ [key: string]: Contact }>;

  constructor(
      private stateService: StateInterfaceService,
      private router: Router
  ) {
      this.contacts$ = this.stateService.selectAllContacts();
  }

  ngOnInit() {
      this.loadContacts().subscribe(() => {});
  }

  loadContacts(): Observable<any> {
      return this.contacts$.pipe(
          tap(contacts => {
              if (_.isEmpty(contacts))                      // if contacts are not loaded..
                  this.stateService.loadAllContacts();      // ..load all contacts
          })
      );
  }

  openContact(id: string) {
      this.router.navigate(['contact', id]);
  }

  props(obj: { [key: string]: any }) {
      return Object.keys(obj);
  }

}
