import { Action } from '@ngrx/store';
import { Contact } from '../../contact/contact.model';

export enum ActionTypes {

    RemoveContact                               = '[Contact] Remove Contact',
    CreateContact                               = '[Contact View] Create Contact',
    UpdateContact                               = '[Contact View] Update Contact',
    DeleteContact                               = '[Contact View] Delete Contact',
    LoadContact                                 = '[Contact View] Load Contact',
    LoadAllContacts                             = '[Contact List] Load All Contacts',
    APICreateContactSuccess                     = '[Contact API] Created Contact Success',
    APICreateContactError                       = '[Contact API] Created Contact Error',
    APIUpdateContactSuccess                     = '[Contact API] Updated Contact Success',
    APIUpdateContactError                       = '[Contact API] Updated Contact Error',
    APIDeleteContactSuccess                     = '[Contact API] Deleted Contact Success',
    APIDeleteContactError                       = '[Contact API] Deleted Contact Error',
    APILoadContactSuccess                       = '[Contact API] Loaded Contact Success',
    APILoadContactError                         = '[Contact API] Loaded Contact Error',
    APILoadAllContactsSuccess                   = '[Contact API] Loaded All Contacts Success',
    APILoadAllContactsError                     = '[Contact API] Loaded All Contacts Error'

}

export class RemoveContact implements Action {
    readonly type = ActionTypes.RemoveContact;

    constructor(public payload: { contactId: string }) {}
}

export class CreateContact implements Action {
    readonly type = ActionTypes.CreateContact;

    constructor(public payload: { contact: Contact }) {}
}

export class UpdateContact implements Action {
    readonly type = ActionTypes.UpdateContact;

    constructor(public payload: { id: string, contact: Contact }) {}
}

export class DeleteContact implements Action {
    readonly type = ActionTypes.DeleteContact;

    constructor(public payload: { id: string }) {}
}

export class LoadContact implements Action {
    readonly type = ActionTypes.LoadContact;

    constructor(public payload: { id: string }) {}
}

export class LoadAllContacts implements Action {
    readonly type = ActionTypes.LoadAllContacts;
}

export class APICreateContactSuccess implements Action {
    readonly type = ActionTypes.APICreateContactSuccess;

    constructor(public payload: { contact: Contact }) {}
}

export class APICreateContactError implements Action {
    readonly type = ActionTypes.APICreateContactError;

    constructor(public payload: { error: Error }) {}
}

export class APIUpdateContactSuccess implements Action {
    readonly type = ActionTypes.APIUpdateContactSuccess;

    constructor(public payload: { contact: Contact }) {}
}

export class APIUpdateContactError implements Action {
    readonly type = ActionTypes.APIUpdateContactError;

    constructor(public payload: { error: Error }) {}
}

export class APIDeleteContactSuccess implements Action {
    readonly type = ActionTypes.APIDeleteContactSuccess;

    constructor(public payload: { id: string }) {}
}

export class APIDeleteContactError implements Action {
    readonly type = ActionTypes.APIDeleteContactError;

    constructor(public payload: { error: Error }) {}
}

export class APILoadContactSuccess implements Action {
    readonly type = ActionTypes.APILoadContactSuccess;

    constructor(public payload: { contact: Contact }) {}
}

export class APILoadContactError implements Action {
    readonly type = ActionTypes.APILoadContactError;

    constructor(public payload: { error: Error }) {}
}

export class APILoadAllContactsSuccess implements Action {
    readonly type = ActionTypes.APILoadAllContactsSuccess;

    constructor(public payload: { contacts: Contact[] }) {}
}

export class APILoadAllContactsError implements Action {
    readonly type = ActionTypes.APILoadAllContactsError;

    constructor(public payload: { error: Error }) {}
}

export type ActionsUnion =  RemoveContact |
                            CreateContact |
                            UpdateContact |
                            DeleteContact |
                            LoadContact |
                            LoadAllContacts |
                            APICreateContactSuccess |
                            APICreateContactError |
                            APIUpdateContactSuccess |
                            APIUpdateContactError |
                            APIDeleteContactSuccess |
                            APIDeleteContactError |
                            APILoadContactSuccess |
                            APILoadContactError |
                            APILoadAllContactsSuccess |
                            APILoadAllContactsError;
