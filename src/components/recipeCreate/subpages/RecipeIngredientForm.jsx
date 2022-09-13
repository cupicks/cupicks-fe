import { useEffect } from "react";

import styled from "styled-components"

import RecipeIngredient from '../element/RecipeIngredient'

const RecipeIngredientForm = (props) => {
  const {cupState, setCupState, stepState, formProps, onClick} = props

  const {currCupSize, cupFull, isIceTag} = cupState
  const {subStep, finalSubStep} = stepState
  const {watch, setValue, getValues} = formProps

  let newFields = watch('ingredientList');
  useEffect(()=>{
    console.log(newFields);
  }, [newFields])
  
  /** cupSize보다 넘치는 값 자르는 함수 */
  const calcAmount = (e) => {
    const currValue = e.target.value;
    const currTargetName = e.target.name;
    const newList = getValues('ingredientList');
    const newCupSize = +(""+currCupSize).split('ml')[0];
    isIceTag?newCupSize-200:''

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
      setValue(currTargetName, maxValue)
      setCupState(prev => ({...prev, cupFull: true}))
      
      alert('재료가 모두 찼습니다.')
    } else {
      setCupState(prev => ({...prev, cupFull: false}))
    }
  }

  const cupIsFull = cupState.cupFull
  const addNewIngredientMode = (subStep === 0 || subStep === finalSubStep)

  return ( 
    <StWrap>

      <div className="info_box_center">

        {(addNewIngredientMode && !cupIsFull) &&
          "+ 버튼을 눌러 재료를 추가해주세요."
        }

        {(addNewIngredientMode && cupIsFull) &&
          "재료가 모두 찼습니다."
        }

      </div>

      {/* 마지막 input만 출력합니다 */}
      { newFields?.map((field, idx) => {
        const lastInput = idx === newFields.length - 1;

        return (
          lastInput &&
          <RecipeIngredient
            key={idx}
            idx={idx}
            cupState={cupState}
            setCupState={setCupState}
            stepState={stepState}
            formProps={formProps}
            onClick={onClick}
            calcAmount={calcAmount}
          />
        )
      })}

    </StWrap>
  )
}

export default RecipeIngredientForm;

const StWrap = styled.div`
  flex: 1 1 auto;
  
  display: flex;
  flex-flow: column;
  
  .info_box_center {
    margin-bottom: 10px;
  }
`