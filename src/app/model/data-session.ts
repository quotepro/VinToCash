export class DataSession {
    sid: string;
    vinNumber: string;
    name: string;
    email: string;
    phone: string;
    zipcode: string;
    actualValue: number;
    latitude: number;
    longitude: number;
    year: string;
    make: string;
    model: string;
    mileage: string;
    exterior: string;
    payoff: boolean;
    condition: string;
    tradein: boolean;
    runs: boolean;

    constructor() {
        this.exterior = '';
        this.condition = '';
    }
}
