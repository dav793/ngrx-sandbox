import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
    of
} from 'rxjs';

import {
    map,
    filter,
    tap,
    mergeMap,
    catchError
} from "rxjs/operators";


import { ToastrService } from "ngx-toastr";
import { ContactService } from "../../contact/contact.service";

import { Contact } from '../../contact/contact.model';
import * as ContactActions from '../actions/contact.actions';

@Injectable()
export class ContactEffects {

    @Effect()
    loadAllContacts = this.actions$.pipe(
        ofType(ContactActions.ActionTypes.LoadAllContacts),
        mergeMap(() => this.contactService.getAllContacts().pipe(
            tap(() => console.log(`fetched contacts from API server`)),
            map(contacts => {

                return {
                    type: ContactActions.ActionTypes.APILoadAllContactsSuccess,
                    payload: {
                        contacts: contacts
                    }
                };

            }),
            catchError(e => {

                return of({
                    type: ContactActions.ActionTypes.APILoadAllContactsError,
                    payload: {
                        error: e
                    }
                });

            })
        ))
    );

    @Effect()
    loadContacts = this.actions$.pipe(
        ofType(ContactActions.ActionTypes.LoadContact),
        mergeMap((a: any) => this.contactService.getContactById(a.payload.id).pipe(
            tap(contact => console.log(`fetched contact ${contact._id} from API server`)),
            map(contact => {

                return {
                    type: ContactActions.ActionTypes.APILoadContactSuccess,
                    payload: {
                        contact: contact
                    }
                };

            }),
            catchError(e => {

                return of({
                    type: ContactActions.ActionTypes.APILoadContactError,
                    payload: {
                        error: e
                    }
                });

            })
        ))
    );

    @Effect()
    updateContact = this.actions$.pipe(
        ofType(ContactActions.ActionTypes.UpdateContact),
        mergeMap((a: any) => {

            const savingToast = this.toastr.show('Please wait...', 'Saving', {
                toastClass: 'ngx-toastr ngx-custom-default',
                timeOut: 3000
            });

            return this.contactService.putContact(a.payload.id, a.payload.contact).pipe(
                tap(contact => console.log(`saved contact ${contact._id} to API server`)),
                map(contact => {

                    this.toastr.clear(savingToast.toastId);
                    this.toastr.success('', 'Saved!', { timeOut: 3000 });

                    return {
                        type: ContactActions.ActionTypes.APIUpdateContactSuccess,
                        payload: {
                            contact: contact
                        }
                    };

                }),
                catchError(e => {

                    this.toastr.clear(savingToast.toastId);
                    this.toastr.error('An error ocurred.', 'Oops!', { timeOut: 3000 });

                    return of({
                        type: ContactActions.ActionTypes.APIUpdateContactError,
                        payload: {
                            error: e
                        }
                    });

                })
            );
        })
    );

    @Effect()
    createContact = this.actions$.pipe(
        ofType(ContactActions.ActionTypes.CreateContact),
        mergeMap((a: any) => {

            const savingToast = this.toastr.show('Please wait...', 'Saving', {
                toastClass: 'ngx-toastr ngx-custom-default',
                timeOut: 3000
            });

            return this.contactService.postContact(a.payload.contact).pipe(
                tap(contact => console.log(`saved contact ${contact._id} to API server`)),
                map(contact => {

                    this.toastr.clear(savingToast.toastId);
                    this.toastr.success('', 'Saved!', { timeOut: 3000 });

                    return {
                        type: ContactActions.ActionTypes.APICreateContactSuccess,
                        payload: {
                            contact: contact
                        }
                    };

                }),
                catchError(e => {

                    this.toastr.clear(savingToast.toastId);
                    this.toastr.error('An error ocurred.', 'Oops!', { timeOut: 3000 });

                    return of({
                        type: ContactActions.ActionTypes.APICreateContactError,
                        payload: {
                            error: e
                        }
                    });

                })
            );
        })
    );

    @Effect()
    deleteContact = this.actions$.pipe(
        ofType(ContactActions.ActionTypes.DeleteContact),
        mergeMap((a: any) => {

            const savingToast = this.toastr.show('Please wait...', 'Saving', {
                toastClass: 'ngx-toastr ngx-custom-default',
                timeOut: 3000
            });

            return this.contactService.deleteContact(a.payload.id).pipe(
                tap(() => console.log(`deleted contact ${a.payload.id} to API server`)),
                map(() => {

                    this.toastr.clear(savingToast.toastId);
                    this.toastr.success('', 'Saved!', { timeOut: 3000 });

                    return {
                        type: ContactActions.ActionTypes.APIDeleteContactSuccess,
                        payload: {
                            id: a.payload.id
                        }
                    };

                }),
                catchError(e => {

                    this.toastr.clear(savingToast.toastId);
                    this.toastr.error('An error ocurred.', 'Oops!', { timeOut: 3000 });

                    return of({
                        type: ContactActions.ActionTypes.APIDeleteContactError,
                        payload: {
                            error: e
                        }
                    });

                })
            );
        })
    );

    @Effect()
    logError$ = this.actions$.pipe(
        filter(a => {
            return  a.type === ContactActions.ActionTypes.APICreateContactError ||
                    a.type === ContactActions.ActionTypes.APIUpdateContactError ||
                    a.type === ContactActions.ActionTypes.APIDeleteContactError ||
                    a.type === ContactActions.ActionTypes.APILoadAllContactsError ||
                    a.type === ContactActions.ActionTypes.APILoadContactError;
        }),
        tap((a: any) => console.error(a.payload.error))
    );

    constructor(
        private actions$: Actions,
        private contactService: ContactService,
        private toastr: ToastrService
    ) {}

}
