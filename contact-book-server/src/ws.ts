import * as WebSocket from 'ws';

const logger = require('./winston');

class WebSocketServer {

    server: any;
    pingInterval: any;
    currentClientId = 1;

    createServer(httpServer) {
        const server = new WebSocket.Server({
            server: httpServer,
            clientTracking: true
        });

        // handle new connections
        server.on('connection', (ws: WebSocket, req) => {
            const clientAddr = req.connection.remoteAddress;
            (<any> ws).__clientAddr = clientAddr;   // associate this connection with the request IP address

            (<any> ws).isAlive = true;
            ws.on('pong', () => {
                (<any> ws).isAlive = true;
            });

            ws.on('message', (message: string) => {
                // log the received message and send it back to the client
                logger.info({
                    type: "websocket message received",
                    clientIp: clientAddr,
                    message: message
                });
                ws.send(message);
            });

            // assign client id for new connection and immediately send it to client
            const clientId = this.generateClientId();
            ws.send(JSON.stringify({
                type: MessageTypes.AssignClientId,
                payload: {
                    id: clientId
                }
            }));
            // ws.send(`Connection with ${clientAddr} established`);
        });

        // check for broken connections
        this.pingInterval = setInterval(function ping() {
            server.clients.forEach(function each(ws) {
                if ((<any> ws).isAlive === false)
                    return ws.terminate();

                (<any> ws).isAlive = false;
                ws.ping(() => {});
            });
        }, 30000);

        this.server = server;
        return this.server;
    }

    /**
     * send a message to all connected clients
     *
     * @param {MessageParams} params
     */
    broadcast(params: MessageParams) {
        this.server.clients.forEach(function each(ws) {
            ws.send(JSON.stringify(params));
        });
    }

    private generateClientId(): number {
        const id = this.currentClientId;

        if (this.currentClientId < CLIENT_ID_LIMIT)
            this.currentClientId++;
        else
            this.currentClientId = 0;   // reset client id count


        return id;
    }

}

export default new WebSocketServer();

export interface MessageParams {
    type: string,
    payload: any
};

export enum MessageTypes {

    AssignClientId          = 'ASSIGN CLIENT ID',
    ModifyContact           = 'MODIFY CONTACT',
    DeleteContact           = 'DELETE CONTACT'

}

const CLIENT_ID_LIMIT = 99999999;
