
export interface Contact {
    _id?: string;
    name: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    },
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export function contactFactory(data: any): Contact {
    return {
        name: data.name || '',
        email: data.email || '',
        address: {
            street: data.address.street || '',
            suite: data.address.suite || '',
            city: data.address.city || '',
            zipcode: data.address.zipcode || ''
        },
        phone: data.phone || '',
        website: data.website || '',
        company: {
            name: data.company.name || '',
            catchPhrase: data.company.catchPhrase || '',
            bs: data.company.bs || ''
        }
    };
}
