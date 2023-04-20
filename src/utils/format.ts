export function toBoolean(value: any) {
    switch (value) {
        case true:
        case 'true':
        case 1:
        case '1':
            return true;
        default:
            return false;
    }
}