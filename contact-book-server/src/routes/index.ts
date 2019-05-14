import {Router, Request, Response, NextFunction} from 'express';
// @ts-ignore
import {Observable, of} from "rxjs";

import WebSocketServer from "../ws";
import { MessageParams } from "../ws";

const env = require('../../config/environment');

export class IndexRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', (req, res) => {
            of(null).subscribe(() => {              // example usage of observable

                res.send("Hello World!");

            });
        });
    }
}

export default new IndexRouter().router;
