export class BuyNowForm {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phone: string;
    email: string;
    annualIncome: string;
    addVehicleWarranty: boolean;
    paytype: string;
    buyOrReserve: string;

    constructor(copy?: Partial<BuyNowForm>) {
        this.paytype = 'card';
        this.buyOrReserve = 'buy';

        Object.assign(this, copy);
    }
}
