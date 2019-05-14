import { Document, Schema, Model, model, Types} from 'mongoose';
import { IContact } from '../interfaces/contact';

const logger = require('../winston');

export interface IContactModel extends IContact, Document {
    _id: Types.ObjectId;
}

export var ContactSchema: Schema = new Schema({
    name: String,
    email: String,
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    },
}, {
    timestamps: true
});

export const Contact: Model<IContactModel> = model<IContactModel>('Contact', ContactSchema);
