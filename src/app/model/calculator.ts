export class Calculator {
    purchaseAmount: number;
    downPayment: number;
    loanAmount: number;
    loanLength: number;
    creditScore: number;
    period: number;
    installmentAmount: number;
    totalCost: number;
    interestPaid: number;
    installments: number;
    periodicAmount: number;
    totalPaid: number;
    payment: number;
    totalInterest: number;
    periodicPurchaseAmount: number;

    constructor(copy?: Partial<Calculator>) {
        Object.assign(this, copy);
    }
}
