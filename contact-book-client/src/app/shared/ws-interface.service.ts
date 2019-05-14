import { Injectable } from "@angular/core";
import { filter } from "rxjs/operators";

import { StateInterfaceService } from "../store/state-interface.service";
import { WebSocketService } from "./ws.service";
import {
    WS_AssignClientId,
    WS_DeleteContact,
    WS_ModifyContact
} from "./ws-messages";

import { environment } from "../../environments/environment";

@Injectable()
export class WSInterfaceService{

    constructor(
        private stateService: StateInterfaceService,
        private ws: WebSocketService
    ) {}

    initListeners() {
        this.ws.createStream(environment.wsUrl);        // open WS connection and start listening

        this.listenClientId();                          // listen for client ID assignment WS message
        this.listenContactModifications();              // listen for contact modification WS messages
        this.listenContactDeletions();                  // listen for contact deletion WS messages
    }

    listenClientId() {
        this.ws.wsStream.pipe(
            filter(msg => msg.type === 'ASSIGN CLIENT ID')
        ).subscribe((msg: WS_AssignClientId) => this.stateService.assignClientId(msg.payload.id));
    }

    listenContactModifications() {
        this.ws.wsStream.pipe(
            filter(msg => msg.type === 'MODIFY CONTACT')
        ).subscribe((msg: WS_ModifyContact) => this.stateService.handleContactModifyNotif(msg));
    }

    listenContactDeletions() {
        this.ws.wsStream.pipe(
            filter(msg => msg.type === 'DELETE CONTACT')
        ).subscribe((msg: WS_DeleteContact) => this.stateService.handleContactDeleteNotif(msg));
    }

}
