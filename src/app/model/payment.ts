export class Payment {
    balance: number;
    principle: number;
    interest: number;
    amount: number;

    constructor( copy?: Partial<Payment>) {
        Object.assign(this, copy);
    }
}
