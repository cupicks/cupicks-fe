const IngredientList = (props) => {
  const {register, setValue, fields, append, remove} = props;

  const calcAmount = (e) => {
    const newList = watch('ingrediantList');
    const currCupSize = Number(watch('cupSize'));
    const idx = e.target.id;
    
    // max: 현재 컵 용량
    let eventAmount = numberPositiveInteger(e.target.value);
    eventAmount = eventAmount > currCupSize ? currCupSize : eventAmount;

    // sumArray: 배열의 ingredientAmount 합
    let sumArray;
    if(newList.length > 1){
      sumArray = newList.reduce((x, curr) => {
        const amount_x = numberPositiveInteger(x.ingredientAmount);
        const amount_curr = numberPositiveInteger(curr.ingredientAmount);
        return amount_x + amount_curr
      })
    } else {
      sumArray = numberPositiveInteger(newList[0].ingredientAmount);
    }

    // 컵 용량보다 sumArray가 크다면(용량이 넘치면)
    // 500까지인데 기존 200 + 400이면 
    if(currCupSize < sumArray){
      const overThisMuch = sumArray - currCupSize;
      console.log(abs(overThisMuch));
      setValue(`ingrediantList.${idx}.ingredientAmount`, eventAmount - overThisMuch)
    } else {
      setValue(`ingrediantList.${idx}.ingredientAmount`, eventAmount)
    }

    // amountLeft: 컵 용량에서 sumArray를 뺀 값
    const amountLeft = currCupSize - sumArray;
  }

  const numberPositiveInteger = (value) => {
    return Math.floor(Math.abs(Number(value)));
  }

  return ( 
    <>
      {fields.map((field, idx) => (
        <div
          key={field.id}
        >
          <input 
            type="text" 
            placeholder={`재료 ${idx}`}
            {...register(`ingrediantList.${idx}.ingredientName`)}
          />

          <select 
            {...register(`ingrediantList.${idx}.ingredientColor`)}
          >
            <option value="#000000">옵션1</option>
            <option value="#111111">옵션2</option>
            <option value="#222222">옵션2</option>
          </select>

          <input 
            type="number"
            placeholder={ `재료 ${idx}` }
            id={ idx }
            max={ 1000 }
            {...register(`ingrediantList.${idx}.ingredientAmount`, {
              max: {
                value: 1000,
                message: "1000이하로 입력"
              }
            })}
            onBlur={(e)=>{
              calcAmount(e);
            }}
            onChange={(e)=>{
              const value = String(e.target.value)
              const currValue = value.length > 3 ? Number(value.slice(0, 4)) : Number(value);

              setValue(`ingrediantList.${idx}.ingredientAmount`, currValue)
            }}
          />
        </div>
      ))}

      <button 
        type="button" 
        onClick={()=>{
          append()
      }}>
        재료 추가
      </button>
      <button 
        type="button" 
        onClick={()=>{
          remove(fields.length-1)
      }}>
        재료 삭제
      </button>
      <hr style={{margin: "1em auto"}} />
    </>
  )
}

export default IngredientList;