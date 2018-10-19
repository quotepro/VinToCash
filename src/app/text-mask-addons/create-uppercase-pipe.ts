export default function createUppercasePipe() {
    return function(conformedValue: string) {
        if (conformedValue) {
            return ('' + conformedValue).toUpperCase();
        }
        return conformedValue;
    };
}
