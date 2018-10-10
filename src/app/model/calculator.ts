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
    transactionFee: number;
    paymentsSaved: number;
    interestSaved: number;
    effectiveTerm: number;
    filterby: number; // 1 = filter by purchase power, 2 = filter by installment payment

    constructor(copy?: Partial<Calculator>) {
        Object.assign(this, copy);
        this.transactionFee = environment.transactionFee;
    }



}
