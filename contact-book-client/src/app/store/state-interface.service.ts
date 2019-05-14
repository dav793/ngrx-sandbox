import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

import { State } from "./state";
import * as ContactActions from "./actions/contact.actions";
import * as ClientActions from "./actions/client.actions";

import { Contact } from "../contact/contact.model";

import { WS_DeleteContact, WS_ModifyContact } from "../shared/ws-messages";

@Injectable({
    providedIn: 'root'
})
export class StateInterfaceService {

    constructor(private store: Store<State>) {}

    selectAllContacts(): Observable<{ [key: string]: Contact }> {
        return this.store.select(state => state.contacts.all);
    }

    selectContact(id: string): Observable<Contact> {
        return this.store.select(state => state.contacts.all[id]);
    }

    selectClientId(): Observable<number> {
        return this.store.select(state => state.client.clientId).pipe(
            filter(clientId => clientId ? true : false)
        );
    }

    assignClientId(id: number): void {
        return this.store.dispatch(new ClientActions.AssignedClientId({ id: id }))
    }

    loadAllContacts(): void {
        this.store.dispatch(new ContactActions.LoadAllContacts());
    }

    loadContact(id: string): void {
        this.store.dispatch(new ContactActions.LoadContact({ id: id }))
    }

    createContact(body: Contact): void {
        this.store.dispatch(new ContactActions.CreateContact({ contact: body }));
    }

    updateContact(id: string, body: Contact): void {
        this.store.dispatch(new ContactActions.UpdateContact({ id: id, contact: body }));
    }

    deleteContact(id: string): void {
        this.store.dispatch(new ContactActions.DeleteContact({ id: id }));
    }

    removeContact(id: string): void {
        this.store.dispatch(new ContactActions.RemoveContact({ contactId: id }))
    }

    handleContactModifyNotif(message: WS_ModifyContact) {
        this.selectClientId().subscribe(clientId => {
            if (clientId !== message.payload.clientId)
                this.loadContact(message.payload.contactId);
        });
    }

    handleContactDeleteNotif(message: WS_DeleteContact) {
        this.selectClientId().subscribe(clientId => {
            if (clientId !== message.payload.clientId)
                this.removeContact(message.payload.contactId);
        });
    }

}
