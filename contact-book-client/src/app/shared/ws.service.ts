import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class WebSocketService{

    ws: WebSocket;
    wsSubject: Subject<any> = new Subject();

    constructor() {}

    get wsStream(): Subject<any> { return this.wsSubject; }

    createStream(wsServerUrl: string) {
        this.ws = new WebSocket(wsServerUrl);

        let stream = new Observable(
            (observer: any) => {

                this.ws.onmessage = (event) => {

                    let parsed;
                    try {
                        parsed = JSON.parse(event.data);
                    } catch(e) {
                        parsed = event.data;
                    }

                    console.log('received ws message', parsed);
                    observer.next(parsed);

                };

                this.ws.onerror = (event) => observer.error(event);

                this.ws.onclose = (event) => observer.complete();

            }
        );
        stream.subscribe((data: any) => this.wsSubject.next(data));

        console.log(`created WS channel on ${wsServerUrl}`);
    }

    sendMessage(message: any){
        if (this.ws)
            this.ws.send(message);
        else
            throw new Error('WebSocket server is not initialized');
    }

}
