import styled from "styled-components"

import RecipeIngredient from '../element/RecipeIngredient'

import { cutNumberByLength } from '../../../util/recipeCalcNumber'

const IngredientList = (props) => {
  const {cupState, setCupState, formProps, formArrayProps} = props;
  const {sublevel, finalSublevel, currCupSize} = cupState;
  const {fields} = formArrayProps
  const {watch, setValue, register} = formProps
  
  /** cupSize보다 넘치는 값 자르는 함수 */
  const calcAmount = (e) => {
    const currValue = e.target.value;
    const newList = watch('ingredientList');
    const newCupSize = +(""+currCupSize).split('ml')[0];
    const currTargetName = e.target.name;

    // sumArray: 배열의 ingredientAmount 합
    let prevSum = 0;
    let totalSum = 0;
    if(newList.length > 1){
      newList.map(list => totalSum += +list.ingredientAmount)
      prevSum = totalSum - currValue;
    } else {
      totalSum = newList[0].ingredientAmount;
    }
    
    // newCupSize에서 prevSum을 뺀 만큼이 max입니다.
    // 컵 용량보다 currValue가 크다면(용량이 넘치면) 현재 용량으로 고정
    const maxValue = newCupSize - prevSum;

    if(maxValue < currValue){
      e.target.value = maxValue;
      setCupState({...cupState})
      setValue(currTargetName, maxValue)
      
      alert('컵 사이즈를 초과하였습니다.')
    }
  }
  
  return ( 
    <StIngredientList>
      {sublevel === 0 || sublevel === finalSublevel &&
        <div className="info_box_center">
          + 버튼을 눌러 재료를 추가해주세요.
        </div>
      }

      {fields.map((field, idx) => {
        const lastInput = idx === fields.length - 1;
        return (
          lastInput &&
          <>
            <RecipeIngredient
              key={field.id}
              idx={idx}
              watch={watch}
              register={register}
              calcAmount={calcAmount}
              cutNumberByLength={cutNumberByLength}
              cupState={cupState}
            />
          </>
        )
      })}

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