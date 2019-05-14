import { Component } from '@angular/core';

import { WSInterfaceService } from "./shared/ws-interface.service";

import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private ws: WSInterfaceService) {
        this.init();
    }

    init() {
        this.ws.initListeners();
    }

}
