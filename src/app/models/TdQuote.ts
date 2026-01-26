export type TdQuote = {
    by: string;
    value: string;
    date: string;
}

export type TdQuoteWithId = TdQuote & {
    _id: string;
}