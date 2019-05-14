import * as mongoose from 'mongoose';

module.exports = [
    {
        _id: mongoose.Types.ObjectId("000000000000000000000000"),
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874"
        },
        phone: "1-770-736-8031",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
        }
    },
    {
        _id: mongoose.Types.ObjectId("000000000000000000000001"),
        name: "Ervin Howell",
        email: "Shanna@melissa.tv",
        address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771"
        },
        phone: "010-692-6593",
        website: "anastasia.net",
        company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains"
        }
    }
];
