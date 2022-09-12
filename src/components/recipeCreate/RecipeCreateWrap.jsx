import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import api from '../../server/api'
import { setDataType } from '../../util/recipeSetDataType'

import RecipeCreateNavigation from "./RecipeCreateNavigation";
import RecipeVisualContainer from "./RecipeVisualContainer";

import RecipeCupSize from "./subpages/RecipeCupSize";
import RecipeIsIced from "./subpages/RecipeIsIced";
import RecipeTextValue from "./subpages/RecipeTextValue";
import RecipeIngredientList from "./subpages/RecipeIngredientList";

import styled from "styled-components";
import RecipeFormContainer from "./RecipeFormContainer";

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
    level: 0,
    finalLevel: 3,
    sublevel: 0,
    finalSublevel: 4,
    cupStyleHeight: 0,
    isIcedTag: null,
    isPublicTag: null,
    currCupSize: null,
    ingredientDeleteMode: false,
    currIngredientList: []
  })
  const [step, setStep] = useState({
    step: 0,
    finalStep: 3,
    subStep: 0,
    finalSubStep: 4,
  })

  const { level, finalLevel } = cupState;

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

  console.log('hi')
  
  /** finalLevel일 때 onSumit 시 */
  const onSubmit = data => {
    data = setDataType(data);
    
    console.log('req');
    if(level === finalLevel){
      // RecipeCreating(data)
      console.log(data)
    }
  }
  
  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>

      <RecipeCreateNavigation
        cupState={cupState}
        setCupState={setCupState}
      />

      {level !== 3 && 
        <RecipeVisualContainer
          cupState={cupState}
          setCupState={setCupState}
          formProps={formProps}
          formArrayProps={formArrayProps}
        />
      }
    
      <RecipeFormContainer
        cupState={cupState}
        setCupState={setCupState}
        formProps={formProps}
        formArrayProps={formArrayProps}
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