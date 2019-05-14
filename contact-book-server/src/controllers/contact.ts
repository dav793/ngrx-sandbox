import {Contact, IContactModel} from '../models/contact';

import ws, { MessageParams, MessageTypes } from '../ws';

const logger = require('../winston');

module.exports.getContactById = (id: string, callback: (err: any, contact?: IContactModel) => {}) => {
    Contact.findOne({_id: id}, (err, contact) => {
        if (err) callback(err);
        else callback(null, contact);
    });
};

module.exports.getContacts = (callback: (err: any, contacts?: IContactModel[]) => {}) => {
    Contact.find({}, (err, contacts) => {
        if (err) callback(err);
        else callback(null, contacts);
    });
};

module.exports.getContactCount = (callback: (err: any, count?: number) => {}) => {
    Contact.count({}, (err, count) => {
        if (err) callback(err);
        else callback(null, count);
    });
};

module.exports.createContact = (contactData: any, clientId: number, callback: (err: any, contact?: IContactModel) => {}) => {
    Contact.create(contactData, (err, contact) => {
        if (err) callback(err);
        else {

            ws.broadcast({
                type: MessageTypes.ModifyContact,
                payload: {
                    contactId: contact._id.toString(),
                    clientId: clientId
                }
            });

            callback(null, contact);

        }
    });
};

module.exports.updateContact = (id: string, contactData: any, clientId: number, callback: (err: any, contact?: IContactModel) => {}) => {
    Contact.findByIdAndUpdate(id, contactData, {new: true}, (err, contact) => {
        if (err) callback(err);
        else {

            // setTimeout(() => {
                ws.broadcast({
                    type: MessageTypes.ModifyContact,
                    payload: {
                        contactId: contact._id.toString(),
                        clientId: clientId
                    }
                });

                callback(null, contact);
            // }, 2000);

        }
    });
};

module.exports.deleteContact = (id: string, callback: (err: any, resp?: any) => {}) => {
    Contact.findOneAndDelete({_id: id}, (err, resp) => {
        if (err) callback(err);
        else {

            ws.broadcast({
                type: MessageTypes.DeleteContact,
                payload: {
                    contactId: id
                }
            });

            callback(null, resp);

        }
    });
};
