export class CoveragePlan {
    description: string;
    weekly: number;
    biweekly: number;
    monthly: number;
    expanded: boolean;
    detail: string;

    constructor(copy?: Partial<CoveragePlan>) {
        Object.assign(this, copy);
    }
}
