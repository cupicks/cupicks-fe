import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import api from '../../server/api'
import { setDataType } from '../../util/recipeSetDataType'

import RecipeCreateNavigation from "./RecipeCreateNavigation";
import RecipeVisualContainer from "./RecipeVisualContainer";
import RecipeFormContainer from "./RecipeFormContainer";

import styled from "styled-components";

const RecipeCreateForm = () => {
  const navigate = useNavigate();

  const { register, watch, setValue, getValues, trigger, resetField, handleSubmit, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ 
    control, 
    name: "ingredientList"
  })

  const formProps = {register, watch, setValue, getValues, errors, trigger}
  const formArrayProps = {fields, append, remove, resetField}

  const [cupState, setCupState] = useState({
    cupStyleHeight: 0,
    isIcedTag: null,
    isPublicTag: null,
    currCupSize: null,
    cupFull: false,
    ingredientDeleteMode: false,
    currIngredientList: []
  })

  const [stepState, setStepState] = useState({
    step: 0,
    finalStep: 3,
    subStep: 0,
    finalSubStep: 4,
  })

  const { step, finalStep } = stepState;

  // state 리랜더 확인하는 곳----------------
  console.log('리랜더');      
  const colorChangeHandler = (e) => {
    // const targetInfo = e.target.htmlFor.split('#')[0]
    // const currName = targetInfo[0]
    // const currColor = targetInfo[1]

    // // setCupState(prev => ({...prev, [currName]: 0}))
    
    // console.log(cupState);
    trigger('ingredientList')
  }
  // ---------------------------------------

  /** 완성한 레피시를 등록하는 함수 */
  const RecipeCreating = async (newData) => {
    let contentType = "application/json"

    try {
      const response = await api(contentType).post(
        `/recipes`,
        newData
      ).then( res => {
        const recipeId = res.data.recipeId
        navigate(`/recipe/detail/${recipeId}`)
      })
      
    } catch (err) {
      console.log(err);
    }
  }
  
  /** finalStep일 때 onSumit 시 */
  const onSubmit = data => {
    data = setDataType(data);
    
    console.log('req');
    if(step === finalStep){
      // RecipeCreating(data)
      console.log(data)
    }
  }
  
  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>

      <RecipeCreateNavigation
        cupState={cupState}
        setCupState={setCupState}
        stepState={stepState}
        setStepState={setStepState}
        formProps={formProps}
        />

      {step !== 3 && 
        <RecipeVisualContainer
          cupState={cupState}
          setCupState={setCupState}
          stepState={stepState}
          setStepState={setStepState}
          formProps={formProps}
          formArrayProps={formArrayProps}
        />
      }
    
      <RecipeFormContainer
        cupState={cupState}
        setCupState={setCupState}
        stepState={stepState}
        setStepState={setStepState}
        formProps={formProps}
        formArrayProps={formArrayProps}
        colorChangeHandler={colorChangeHandler}
      />

    </StForm>
  )
};

export default RecipeCreateForm;

const StForm = styled.form`
  height: 100%;

  display: flex;
  flex-flow: column;
  text-align: center;

  background-color: #eee;

  h4 {
    font-weight: 500;
  }
`