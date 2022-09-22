import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import api from '../../server/api'
import { setDataType } from '../../util/recipeSetDataType'

import RecipeCreateNavigation from "./RecipeCreateNavigation";
import RecipeVisualContainer from "./RecipeVisualContainer";
import RecipeFormContainer from "./RecipeFormContainer";

import ToastMessage from "../elements/modal/ToastMessage";
import imageUrl from '../../assets/image/illustration/illustration04.png'

import styled from "styled-components";

const RecipeCreateForm = () => {

  const navigate = useNavigate();

  const { register, watch, setValue, getValues, trigger, reset, resetField, handleSubmit, setError, clearErrors, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ 
    control, 
    name: "ingredientList"
  })

  const formProps = {register, watch, setValue, getValues, reset, errors, trigger, clearErrors, setError}
  const formArrayProps = {fields, append, remove, resetField}

  const [cupState, setCupState] = useState({
    cupStyleHeight: 0,
    isIcedTag: null,
    isPublicTag: null,
    currCupSize: null,
    cupFull: false,
    cupZero: false,
    cupLeft: null,
    ingredientDeleteMode: false,
    currentIngredientDeleted: false,
    currIngredientList: []
  })

  const [stepState, setStepState] = useState({
    step: 0,
    finalStep: 3,
    subStep: 0,
    finalSubStep: 4,
  })
  
  const [recipeCreated, setRecipeCreated] = useState(false)
  const { step, finalStep } = stepState;

  /** 완성한 레피시를 등록하는 함수 */
  const RecipeCreating = async (newData) => {
    let contentType = "application/json"

    try {
      const response = await api(contentType).post(
        `/recipes`,
        newData
      ).then( res => {
        const recipeId = res.data.recipeId
        
        setRecipeCreated(true)
        setTimeout(()=>{
          navigate(`/recipe/${recipeId}/detail/`)
          setRecipeCreated(false)
        }, 1600)
      })
      
    } catch (err) {
      console.log(err);
    }
  }
  
  /** finalStep일 때 onSumit 시 */
  const onSubmit = data => {
    data = setDataType(data);
    
    console.log(data);

    if(step === finalStep){
      RecipeCreating(data)
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
        formArrayProps={formArrayProps}
        recipeCreated={recipeCreated}
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
      />

      {/* 모달 리스트 */}
      {recipeCreated && 
        <ToastMessage
          text={'축하합니다!\n레시피를 완성하였습니다!'}
          imageUrl={imageUrl}
        />
      }

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
  button {
    transition: all .3s;
  }
  .disable,
  button:disabled {
    opacity: .6;
  }
`