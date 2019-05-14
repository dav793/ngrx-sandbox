import { Action } from '@ngrx/store';

export enum ActionTypes {

    AssignedClientId = '[Client] Assigned Client ID'

}

export class AssignedClientId implements Action {
    readonly type = ActionTypes.AssignedClientId;

    constructor(public payload: { id: number }) {}
}

export type ActionsUnion =  AssignedClientId;
