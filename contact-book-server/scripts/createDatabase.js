use contact-book;

db.createCollection("contacts");

db.createUser({
    user: "contact-book",
    pwd: "12345678",
    roles: [
        {role: "readWrite", db: "contact-book"},
        {role: "dbOwner", db: "contact-book"}
    ]
});
