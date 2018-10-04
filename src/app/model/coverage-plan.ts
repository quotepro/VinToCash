export class CoveragePlan {
    description: string;
    weekly: number;
    biweekly: number;
    monthly: number;

    constructor(copy?: Partial<CoveragePlan>) {
        Object.assign(this, copy);
    }
}
