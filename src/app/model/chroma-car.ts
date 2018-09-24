export class ChromaCar {
    'dealer_id': string;
    'imageList': string;
    'vin': string;
    'year': number;
    'make': string;
    'model': string;
    'retail_price': number;
    'sale_price': number;
    'optionList': string;
    'descriptions': string;

    constructor(copy?: Partial<ChromaCar>) {
        if (copy) {
            Object.assign(this, copy);
            if (copy['image_urls']) {
                this.imageList = copy['image_urls'].split(',');
            }
            if (copy['options']) {
                this.optionList = copy['options'].split(',');
            }
        }
    }
}


