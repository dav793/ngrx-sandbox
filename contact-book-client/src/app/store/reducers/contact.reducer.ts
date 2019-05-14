import { ContactState, initialContactState } from '../state';
import * as ContactActions from '../actions/contact.actions';

export function contactReducer(
    state = initialContactState,
    action: ContactActions.ActionsUnion
): ContactState {
    switch (action.type) {

        case ContactActions.ActionTypes.RemoveContact: {
            if (action.payload.contactId in state.all) {
                let obj = Object.assign({}, state.all);
                delete obj[action.payload.contactId];
                return { all: obj };
            }
            return state;
        }

        case ContactActions.ActionTypes.APICreateContactSuccess: {
            let obj = {};
            obj[action.payload.contact._id] = action.payload.contact;
            return { all: Object.assign({}, state.all, obj) };
        }

        case ContactActions.ActionTypes.APIUpdateContactSuccess: {
            let obj = {};
            obj[action.payload.contact._id] = action.payload.contact;
            return { all: Object.assign({}, state.all, obj) };
        }

        case ContactActions.ActionTypes.APIDeleteContactSuccess: {
            if (action.payload.id in state.all) {
                let obj = Object.assign({}, state.all);
                delete obj[action.payload.id];
                return { all: obj };
            }
            return state;
        }

        case ContactActions.ActionTypes.APILoadContactSuccess: {
            let obj = {};
            obj[action.payload.contact._id] = action.payload.contact;
            return { all: Object.assign({}, state.all, obj) };
        }

        case ContactActions.ActionTypes.APILoadAllContactsSuccess: {
            let obj = {};
            action.payload.contacts.forEach(c => obj[c._id] = c);
            return { all: obj };
        }

        default: {
            return state;
        }

    }
}


