export class Payment {
    balance: number;
    principle: number;
    interest: number;
    amount: number;
    payments: number; // this is the number of payments applied. Used for annual rollups

    constructor( copy?: Partial<Payment>) {
        this.payments = 0;
        Object.assign(this, copy);
    }
}
