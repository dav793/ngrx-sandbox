
export interface WS_AssignClientId {
    type: 'ASSIGN CLIENT ID',
    payload: {
        id: number
    }
};

export interface WS_ModifyContact {
    type: 'MODIFY CONTACT',
    payload: {
        contactId: string,
        clientId: number
    }
};

export interface WS_DeleteContact {
    type: 'DELETE CONTACT',
    payload: {
        contactId: string,
        clientId: number
    }
};
