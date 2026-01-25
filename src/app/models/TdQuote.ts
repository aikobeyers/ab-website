export type TdQuote = {
    name: string;
    quote: string;
    date: string;
}

export type TdQuoteWithId = TdQuote & {
    _id: string;
}