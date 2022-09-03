import styled from "styled-components"

import RecipeIngredient from '../element/RecipeIngredient'

import { cutNumberByLength } from '../../../util/recipeCalcNumber'

const IngredientList = (props) => {
  const {register, setValue, fields, watch, cupState} = props;
  const {sublevel, setSublevel, finalSublevel} = cupState;

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
    <StIngredientList>
      <div className="info_box_center">
        {sublevel === 0 && '+ 버튼을 눌러 재료를 추가해주세요.'}
      </div>

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

    </StIngredientList>
  )
}

export default IngredientList;

const StIngredientList = styled.div`
  flex: 1 1 auto;
  
  display: flex;
  flex-flow: column;
  
  .info_box_center {
    margin-bottom: 10px;
  }
`