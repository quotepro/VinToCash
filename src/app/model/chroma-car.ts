export class ChromaCar {
    dealer_id: string;
    imageList: Array<string>;
    vin: string;
    year: number;
    make: string;
    model: string;
    retail_price: number;
    sale_price: number;
    optionList: Array<string>;
    descriptions: string;
    ext_color: string;
    int_color: string;
    mileage: string;
    engine: string;
    model_number: string;
    stock_number: string;
    msrp: number;
    adjusted_price: number;
    manufacturer_rebates_price: number;
    selectedImage: string;
    thumbPage: number;
    selectedPlan: string;
    selectedPanel: string;

    constructor(copy?: Partial<ChromaCar>) {
        if (copy) {
            this.selectedPlan = 'Custom';
            Object.assign(this, copy);
            if (copy['image_urls']) {
                this.imageList = copy['image_urls'].replace(/http:/g, 'https:').split(',');
            }
            if (copy['options']) {
                this.optionList = copy['options'].split(',').sort((a: string, b: string): number => {
                    if ( a < b) {
                        return -1;
                    } else if ( a > b) {
                        return 1;
                    }
                    return 0;
                });
            } else if ( this.descriptions ) {
                this.optionList = this.descriptions.split(',').filter(describe => {
                    return (describe.search(/(no data|\$)/i) === -1);
                });
                this.descriptions = '';
            }
        }
        if (this.imageList.length > 0) {
            this.selectedImage = this.imageList[0];
        }
    }
}


