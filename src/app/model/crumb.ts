import { ActivatedRoute } from '@angular/router';

export class Crumb {
    url: string;
    title: string;
  params: any;
    constructor(copy?: Partial<Crumb>) {
        Object.assign(this, copy);
    }
}
