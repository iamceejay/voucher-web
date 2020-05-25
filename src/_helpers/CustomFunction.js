
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