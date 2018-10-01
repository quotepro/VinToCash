import { environment } from '@env/environment.prod';

export class Calculator {
    downPayment: number;
    loanAmount: number;
    loanLength: number;
    creditScore: number;
    selectedPeriod: number;
    monthlyPayment: number;
    biWeeklyPayment: number;
    weeklyPayment: number;
    biWeeklyPurchasePower: number;
    weeklyPurchasePower: number;
    monthlyPurchasePower: number;
    downChanged: boolean;
    advanced: boolean;
    biweeklyTransactionFee: number;
    paymentsSaved: number;
    interestSaved: number;
    effectiveTerm: number;

    constructor(copy?: Partial<Calculator>) {
        Object.assign(this, copy);
        this.biweeklyTransactionFee = environment.biweeklyTransactionFee;
    }



}
