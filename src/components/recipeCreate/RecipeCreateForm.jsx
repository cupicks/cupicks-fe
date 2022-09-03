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

const RecipeCreateForm = () => {
  const { register, handleSubmit, setValue, trigger, watch, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "ingrediantList" })

  const [cupState, setCupState] = useState({
    level: 0,
    finalLevel: 3,
    sublevel: 0,
    finalSublevel: 2,
    cupStyleHeight: 0,
    ingredientDeleteMode: false,
    isIcedTag: null
  })
  const { level, finalLevel, sublevel, finalSublevel, cupStyleHeight, ingredientDeleteMode, isIcedTag } = cupState
  
  /** finalLevel일 때 onSumit 시, request 보내는 함수 */
  const onSubmit = data => {
    data = setDataType(data);
    
    // level === finalLevel일 때 request할 예정
    if(level === finalLevel + 1){
      console.log('request');
      console.log(data);
    }
  }
  
  /** 'cupSize' radio에 props drilling로 넘겨준 onClick함수 */
  const onClickCupSize = (e) => {
    const currCup = +(""+e.target.textContent).split('ml')[0];
    setCupState({...cupState, cupStyleHeight : +(+currCup / 591 * 100).toFixed(1)})
    
    // setValue('cupSize', currCup)
    setValue('ingrediantList', [])
  }

  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      
      <RecipeCreateNavigation
        watch={watch}
        cupState={cupState}
        setCupState={setCupState}
      />

      {level !== 3 && 
        <RecipeVisualContainer
          fields={fields}
          append={append}
          remove={remove}
          cupState={cupState}
          setCupState={setCupState}
        />
      }

      {level !== 3 &&
        <StRecipeOptContainer>
          {level === 0 && 
            <RecipeCupSize
              errors={errors}              
              register={register}
              setValue={setValue}
              watch={watch}
              trigger={trigger}
              onClickCupSize={onClickCupSize}
            />
          }

          {level === 1 &&
            <RecipeIsIced 
              errors={errors}
              register={register}
              watch={watch}
              setValue={setValue}
              trigger={trigger}
              cupState={cupState}
              setCupState={setCupState}
              />
            }

          {level === 2 && 
            <RecipeIngredientList
              fields={fields}
              register={register}
              setValue={setValue}
              append={append}
              remove={remove}
              watch={watch}
              cupState={cupState}
            />
          }
        </StRecipeOptContainer>
      }

      {level === 3 && 
        <RecipeTextValue
          errors={errors}
          register={register}
          watch={watch}
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
  
  input:checked + label {
    background-color: var(--button-activeBackgroundColor);
    color: var(--button-activeColor);
  }
`