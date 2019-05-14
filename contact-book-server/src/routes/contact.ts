import {Router, Request, Response, NextFunction} from 'express';
import {Contact, IContactModel} from '../models/contact';

const logger = require('../winston');
const contactController = require('../controllers/contact');

export class ContactRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', (req: Request, res: Response, next) => {
            contactController.getContacts((err: any, contacts: IContactModel[]) => {
                if (err) next(err);
                else res.json(contacts);
            });
        });

        this.router.post('/', (req: Request, res: Response, next) => {
            contactController.createContact(req.body, req.body.clientId, (err: any, contact: IContactModel) => {
                if (err) next(err);
                else res.json(contact);
            });
        });

        this.router.get('/:id', (req: Request, res: Response, next) => {
            contactController.getContactById(req.params.id, (err: any, contact: IContactModel) => {
                if (err) next(err);
                else res.json(contact);
            });
        });

        this.router.put('/:id', (req: Request, res: Response, next) => {
            contactController.updateContact(req.params.id, req.body, req.body.clientId, (err: any, contact: IContactModel) => {
                if (err) next(err);
                else res.json(contact);
            });
        });

        this.router.delete('/:id', (req: Request, res: Response, next) => {
            contactController.deleteContact(req.params.id, (err: any) => {
                if (err) next(err);
                else res.status(200).send('OK');
            });
        });
    }
}

export default new ContactRouter().router;
