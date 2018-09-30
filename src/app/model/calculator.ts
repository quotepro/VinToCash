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

    constructor(copy?: Partial<Calculator>) {
        Object.assign(this, copy);
    }

    get selectedPayment(): number {
        switch (this.selectedPeriod) {
            case 1:
                return this.weeklyPayment;
            case 2:
                return this.biWeeklyPayment;
            case 3:
                return this.monthlyPayment;
        }
    }
}
