const convertCurrency = (value) => {
  const formatter = Intl.NumberFormat(
    'de-DE', 
    { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    })
  
  return formatter.format(value)
}

export default {
  convertCurrency, //converts the currency
}
