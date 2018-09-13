export class NearbyDealer {
    Description: string;
    Location: string;
    Latitude: number;
    Longitude: number;
    Distance: number;

    constructor(dealer: any) {
        Object.assign(this, dealer);
    }
}
