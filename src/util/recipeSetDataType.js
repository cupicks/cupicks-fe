/** Recipe 데이터 형변환  */
const setDataType = data => {
  const isPublicTrue = data.isPublic === 'true' ? true : false;
  const isIcedTrue = data.isIced === 'ice' ? true : false;
  const cupSize = +(""+data.cupSize).split('ml')[0];

  let newIngredientList;
  if(data.ingredientList){
    newIngredientList = data.ingredientList.map(list =>(
      {...list, ingredientAmount: +list.ingredientAmount }
    )) 
  }
  
  return ({
    ...data,
    cupSize: cupSize,
    isIced: isIcedTrue,
    isPublic: isPublicTrue,
    ingredientList: newIngredientList
  })
}

export { setDataType }