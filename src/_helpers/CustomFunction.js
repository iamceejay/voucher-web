import moment from 'moment'

export const formatDate = (date , format='DD.MM.YYYY') => {
  return moment(date).local().format(format)
}

export const mergeList = ( array1, array2 ) => {
  const data = ( array1?.data?.length > 0 ) 
    ? 
    {
      ...array2,
      data: [
        ...array1.data,
        ...array2.data
      ] 
    }
    : array2

  return data
}

export const toFormData = (data) => {
  let form_data = new FormData()
  try {
    Object.keys(data).map( (key,index) => {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        for( let i = 0; i < data[key].length; i++ ){
          if(!(data[key][i] instanceof File) && typeof data[key][i] === 'object') {
            Object.keys(data[key][i]).map( (key2,index2) => {
              form_data.append(`${key}[${i}][${key2}]`,  data[key][i][key2])
            })
          } else {
            form_data.append(`${key}[${i}]`,  data[key][i])
          }
        }
      } else {
        form_data.append(key, data[key] || '')
      }
    })
  } catch (err) {
    console.log('err ', err)
  }

  return form_data;
}