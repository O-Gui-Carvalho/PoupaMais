export const currencies = [
    { value: "BRL", label: "R$ Real", locale: "pt-BR" },
    { value: "USD", label: "$ Dollar", locale: "en-US" },
    { value: "EUR", label: "€ Euro", locale: "de-DE" },
    { value: "GBP", label: "£ Pound", locale: "en-GB" },
]

export type Currency = (typeof currencies)[0]