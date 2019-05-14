import { ClientState, initialClientState } from '../state';
import * as ClientActions from '../actions/client.actions';

export function clientReducer(
    state = initialClientState,
    action: ClientActions.ActionsUnion
): ClientState {
    switch (action.type) {

        case ClientActions.ActionTypes.AssignedClientId: {
            return { ...state, clientId: action.payload.id };
        }

        default: {
            return state;
        }

    }
}


