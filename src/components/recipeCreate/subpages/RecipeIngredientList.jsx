import { useState } from "react";
import { useEffect } from "react";

import styled from "styled-components"

import RecipeIngredient from '../element/RecipeIngredient'

const IngredientList = (props) => {
  const {cupState, setCupState, stepState, formProps} = props

  const {currCupSize} = cupState
  const {subStep, finalSubStep} = stepState
  const {watch, setValue, getValues} = formProps
  // const [ hookLoaded, setHookLoaded ] = useState(false);

  let newFields = watch('ingredientList');
  useEffect(()=>{
    console.log(newFields);
  }, [newFields])
  
  // useEffect(()=>{
  //   console.log('랜더링');
  //   // setCupState(prev => ({...prev, currIngredientList: newFields}));
  //   console.log(cupState);

  //   setHookLoaded(true)
  // }, [hookLoaded])
  
  /** cupSize보다 넘치는 값 자르는 함수 */
  const calcAmount = (e) => {
    const currValue = e.target.value;
    const currTargetName = e.target.name;
    const newList = getValues('ingredientList');
    const newCupSize = +(""+currCupSize).split('ml')[0];

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
      
      alert('컵 사이즈를 초과하였습니다.')
    }
  }
  const addNewIngredientMode = (subStep === 0 || subStep === finalSubStep)

  return ( 
    <StIngredientList>

      {addNewIngredientMode &&
        <div className="info_box_center">
          + 버튼을 눌러 재료를 추가해주세요.
        </div>
      }

      {/* 마지막 input만 출력합니다 */}
      { newFields?.map((field, idx) => {
        const lastInput = idx === newFields.length - 1;

        return (
          lastInput &&
          <>
            <RecipeIngredient
              key={idx}
              idx={idx}
              cupState={cupState}
              setCupState={setCupState}
              stepState={stepState}
              formProps={formProps}
              calcAmount={calcAmount}
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