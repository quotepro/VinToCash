import { Calculator } from '@app/model/calculator';
import { ChromaCar } from '@app/model/chroma-car';

export class DataSession {
    actualValue: number;
    calc: Calculator;
    condition: string;
    email: string;
    exterior: string;
    filter: string;
    latitude: number;
    longitude: number;
    make: string;
    mileage: string;
    model: string;
    name: string;
    payoff: boolean;
    phone: string;
    runs: boolean;
    sid: string;
    tradein: boolean;
    url: string;
    vinNumber: string;
    year: string;
    zipcode: string;
    selectedVehicle: ChromaCar;

    constructor() {
        this.exterior = '';
        this.condition = '';
        this.url = '';
        this.filter = '';
    }
}
