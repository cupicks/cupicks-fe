import RecipeIngredient from '../element/RecipeIngredient'
import { cutNumberByLength } from '../../../util/recipeCalcNumber'

const IngredientList = (props) => {
  const {register, setValue, fields, append, remove, watch, sublevel, setSublevel, finalSublevel} = props;

  /** cupSize보다 넘치는 값 자르는 함수 */
  const calcAmount = (e) => {
    const newList = watch('ingrediantList');
    const currCupSize = Number(watch('cupSize'));
    const idx = e.target.id;

    // 소숫점 자르기 => 다시 저장
    const currTargetName = `ingrediantList.${idx}.ingredientAmount`
    const currValue = Math.floor(e.target.value);
    setValue(currTargetName, currValue)
    
    // sumArray: 배열의 ingredientAmount 합
    let prevSum = 0;
    let totalSum = 0;
    if(newList.length > 1){
      newList.map(list => totalSum += list.ingredientAmount)
      prevSum = totalSum - currValue;
    } else {
      totalSum = newList[0].ingredientAmount;
    }
    
    // currCupSize에서 prevSum을 뺀 만큼이 max입니다.
    // 컵 용량보다 currValue가 크다면(용량이 넘치면) 현재 용량으로 고정
    const maxValue = currCupSize - prevSum;

    if (maxValue === 0){
      alert('컵 사이즈를 초과하였습니다.')
    }
    if(maxValue < currValue){
      setValue(currTargetName, maxValue)
    }
  }

  return ( 
    <>
      {fields.map((field, idx) => (
        <RecipeIngredient
          key={field.id}
          idx={idx}
          register={register}
          watch={watch}
          calcAmount={calcAmount}
          cutNumberByLength={cutNumberByLength}
          setValue={setValue}
          sublevel={sublevel}
          setSublevel={setSublevel}
          finalSublevel={finalSublevel}
        />
      ))}

      <button 
        type="button" 
        onClick={()=>{
          append()
          setSublevel(0)
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