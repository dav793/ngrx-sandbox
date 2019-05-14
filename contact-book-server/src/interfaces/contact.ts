
export interface IContact {
    name: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    },
    createdAt?: Date,
    updatedAt?: Date
}
