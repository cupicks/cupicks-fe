import RecipeIngredient from '../RecipeIngredient'
import { cutNumberByLength, numberPositiveInteger } from '../../../util/recipeCalcNumber'

const IngredientList = (props) => {
  const {register, setValue, fields, append, remove, watch} = props;

  /** cupSize보다 넘치는 값 자르는 함수 */
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

  return ( 
    <>
      {fields.map((field, idx) => (
        <RecipeIngredient
          key={field.id}
          idx={idx}
          register={register}
          calcAmount={calcAmount}
          cutNumberByLength={cutNumberByLength}
          setValue={setValue}
        />
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
    </>
  )
}

export default IngredientList;