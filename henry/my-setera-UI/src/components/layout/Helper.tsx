import CurrencySymbol from "./CurrencySymbol";

export function getPriceWithCurrency(data: any, name: any) {
    const currencyName: string = data.currency_id[1];
    let priceTotal = data[`${name}`].toFixed(2).replace('.', ',');
    if (currencyName === 'EUR') {
        return `${priceTotal} ${CurrencySymbol.EUR}`
    }
    return priceTotal
}

export function priceFormatWithCurrency(currency: any, price: any) {
    if (currency !== undefined && currency.length > 0) {
        const currencyName: string = currency[1];
        let priceTotal = price.toFixed(2).replace('.', ',');
        if (currencyName === 'EUR') {
            return `${priceTotal} ${CurrencySymbol.EUR}`
        }
        return priceTotal
    }
    return false;
}