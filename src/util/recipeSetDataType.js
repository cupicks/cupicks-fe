/** Recipe 데이터 형변환  */
const setDataType = data => {
  const isPublicTrue = data.isPublic === '1' ? true : false;
  const isIcedTrue = data.isIced === '1' ? true : false;
  const newIngrediantList = data.ingrediantList.map(list =>(
    {...list, ingredientAmount: Number(list.ingredientAmount) }
  )) 
  
  return ({
    ...data,
    cupSize: Number(data.cupSize),
    isIced: isIcedTrue,
    isPublic: isPublicTrue,
    ingrediantList: newIngrediantList
  })
}

export { setDataType }