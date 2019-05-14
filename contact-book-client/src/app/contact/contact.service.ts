import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { StateInterfaceService } from '../store/state-interface.service';

import { Contact } from './contact.model';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(
        private stateService: StateInterfaceService,
        private http: HttpClient
    ) { }

    getAllContacts(): Observable<Contact[]> {
        return <any> this.http.get<Contact[]>(environment.apiUrl + '/contacts');
    }

    getContactById(id: string): Observable<Contact|null> {
        return this.http.get<Contact>(environment.apiUrl + '/contacts/' + id);
    }

    postContact(body: Contact): Observable<Contact> {
        return this.stateService.selectClientId().pipe(
            mergeMap(clientId => {
                body['clientId'] = clientId;
                return this.http.post<Contact>(environment.apiUrl + '/contacts', body);
            })
        );
    }

    putContact(id: string, body: Contact): Observable<Contact> {
        return this.stateService.selectClientId().pipe(
            mergeMap(clientId => {
                body['clientId'] = clientId;
                return this.http.put<Contact>(environment.apiUrl + '/contacts/' + id, body);
            })
        );
    }

    deleteContact(id: string): Observable<any> {
        return this.http.delete(environment.apiUrl + '/contacts/' + id);
    }

}
