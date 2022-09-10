import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import RecipeCupSize from "./subpages/RecipeCupSize";
import RecipeIsIced from "./subpages/RecipeIsIced";
import RecipeTextValue from "./subpages/RecipeTextValue";
import RecipeIngredientList from "./subpages/RecipeIngredientList";

import { setDataType } from '../../util/recipeSetDataType'

import styled from "styled-components";
import RecipeVisualContainer from "./subpages/RecipeVisualContainer";
import RecipeCreateNavigation from "./subpages/RecipeCreateNavigation";
import RecipeIngredientButtonContainer from "./subpages/RecipeIngredientButtonContainer";

const RecipeCreateForm = () => {
  const { register, watch, setValue, getValues, trigger, resetField, handleSubmit, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ 
    control, 
    name: "ingredientList"
  })
  const formProps = {register, watch, setValue, getValues, errors, trigger}
  const formArrayProps = {fields, append, remove}

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
  const { level, finalLevel } = cupState;

  console.log(cupState.isIcedTag);

  /** finalLevel일 때 onSumit 시, request 보내는 함수 */
  const onSubmit = data => {

    // console.log(data);
    data = setDataType(data);
    
    // level === finalLevel일 때 request할 예정
    if(level === finalLevel){
      console.log('request');
      console.log(data);
    }
  }

  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      
      <RecipeIngredientButtonContainer
        cupState={cupState}
        setCupState={setCupState}
        formArrayProps={formArrayProps}
      />

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

      {level !== 3 &&
        <StRecipeOptContainer>
          {level === 0 && 
            <RecipeCupSize
              cupState={cupState}   
              setCupState={setCupState}
              formProps={formProps}
              formArrayProps={formArrayProps}
              resetField={resetField}
            />
          }

          {level === 1 &&
            <RecipeIsIced 
              cupState={cupState}
              setCupState={setCupState}
              formProps={formProps}
              resetField={resetField}
              remove={remove}
            />
          }

          {level === 2 && 
            <RecipeIngredientList
              cupState={cupState}
              setCupState={setCupState}
              formProps={formProps}
              formArrayProps={formArrayProps}
            />
          }
        </StRecipeOptContainer>
      }

      {level === 3 && 
        <RecipeTextValue
          cupState={cupState}
          setCupState={setCupState}
          formProps={formProps}
        />
      }
      
    </StForm>
  )
};

export default RecipeCreateForm;

const StForm = styled.form`
  flex: 1 1 auto;
  
  display: flex;
  flex-flow: column;
  text-align: center;

  background-color: #eee;

  h4 {
    font-weight: 500;
  }
`

const StRecipeOptContainer = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1.5rem;
  
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  
  .info_box {
    flex: 0 0 100%;
    display: flex;
    gap: 15px;
    
    color: #222;

    text-align: left;
  }

  .error_box {
    flex: 0 0 100%;
    line-height: 1.6;

    color: #888;
  }

  input[type="radio"] {
    /* display: none; */
    position: absolute;
    z-index: -9;
    opacity: 0;
  }

  input {
    flex: 1 1 auto;
  }
  
  label {
    flex: 1 1 auto;
    height: 40px;
    border-radius: .5rem;

    border: 1px solid var(--button-borderColor);

    transition: all .2s;
  }
  
  input:not(.colorLabel):checked + label {
    background-color: var(--button-activeBackgroundColor);
    color: var(--button-activeColor);
  }
`