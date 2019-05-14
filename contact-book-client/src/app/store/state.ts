
import { Contact } from '../contact/contact.model';

export interface State {
    client: ClientState;
    contacts: ContactState;
}

export interface ContactState {
    all: { [key: string]: Contact };
}

export const initialContactState: ContactState = {
    all: {}
};

export interface ClientState {
    clientId: number;
}

export const initialClientState: ClientState = {
    clientId: null
};
