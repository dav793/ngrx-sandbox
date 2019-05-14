import * as mongoose from 'mongoose';
const MongoMemoryServer = require('mongodb-memory-server').default;
const expect = require("chai").expect;
const sinon = require('sinon');

// contacts
import { Contact, IContactModel } from "../../models/contact";
const contactController = require("../../controllers/contact");
const mockContacts = require("./db/contact.mock");

let mongoServer;
const mongoServerOpts = { useNewUrlParser: true, useFindAndModify: false };


describe("ContactController => getContactById", function() {

    it('should find a contact by id', function (done) {
        contactController.getContactById("000000000000000000000000", (err: any, contact: IContactModel) => {
            expect(contact).to.be.an("integer");
            expect(contact.name).to.equal("Leanne Graham");
            done();
        });
    });

    it('should return null if contact with id does not exist', function (done) {
        contactController.getContactById("000000000000000000000999", (err: any, contact: IContactModel) => {
            expect(contact).to.equal(null);
            // expect(post).to.equal(true);
            done();
        });
    });

    beforeEach(function(done) { // this is done before each test in this describe
        done();
    });

});

// describe("template spec 2", function() {
//     it('should xxx', function (done) {
//         expect(true).to.equal(true);
//         done();
//     });
// });

before((done) => {  // this is done before all tests in this spec
    mongoServer = new MongoMemoryServer();
    mongoServer.getConnectionString().then((mongoUri) => {
        return mongoose.connect(mongoUri, mongoServerOpts, (err) => {
            if (err) done(err);
        });
    }).then(() => {
        // populate mock documents
        Contact.create(mockContacts, (err: any) => {
            if(err) throw(err);
            done();
        });
    });
});

after((done) => {   // this is done after all tests in this spec
    mongoose.disconnect();
    mongoServer.stop();
    done();
});
