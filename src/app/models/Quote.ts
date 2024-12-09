export type Quote = {
  quote: string;
  display: boolean;
}

export type QuoteWithId = Quote & {
  _id: string;
}
