const convertCurrency = (value) => {
  const formatter = Intl.NumberFormat(
    'de-DE', 
    { 
      style: 'currency', 
      currency: 'EUR' 
    })
  
  return formatter.format(value)
}

export default {
  convertCurrency, //converts the currency
}
