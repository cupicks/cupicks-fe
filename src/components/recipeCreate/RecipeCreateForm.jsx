import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import RecipeCupSize from "./subpages/RecipeCupSize";
import RecipeIsIced from "./subpages/RecipeIsIced";
import RecipeTextValue from "./subpages/RecipeTextValue";
import RecipeIngredientList from "./subpages/RecipeIngredientList";

import { setDataType } from '../../util/recipeSetDataType'

import styled from "styled-components";

const RecipeCreateForm = () => {
  const { register, handleSubmit, setValue, trigger, watch, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "ingrediantList" })

  const [level, setLevel] = useState(0)
  const finalLevel = 3;

  const [sublevel, setSublevel] = useState(0);
  const finalSublevel = 2;

  /** finalLevel일 때 onSumit 시, request 보내는 함수 */
  const onSubmit = data => {
    data = setDataType(data);

    // level === finalLevel일 때 request할 예정
    if(level === finalLevel + 1){
      console.log('request');
      console.log(data);
    }
  }

  /** 이전 level */
  const levelButtonPrevClickHandler = () => {
    level > 0 && setLevel(prev => prev - 1);
  }
  
  const caseDisabled = ''

  /** 다음 level의 컴포넌트 랜더링 하기 전 조건 확인 */
  const levelButtonNextClickHandler = () => {
    switch (level) {
      case 0:
        if(watch('cupSize') === null) return;
        break;
      case 1:
        if(watch('isIced') === null) return;
        break;
      case 2:
        if(watch('ingrediantList').length === 0) return;
        setSublevel(0)
        break;
      case 3:
        if(watch('title').length === 0 || watch('content').length === 0 ) return;
        setSublevel(0)
        break;
        default: '';
      }
    level < finalLevel + 1 ? setLevel(prev => prev + 1) : '';
  }

  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      
      {level === 0 && 
        <RecipeCupSize
          register={register}
          setValue={setValue}
          errors={errors}
          trigger={trigger}
        />
      }

      {level === 1 &&
        <RecipeIsIced 
          register={register}
          errors={errors}
          watch={watch}
          trigger={trigger}
        />
      }

      {level === 2 && 
        <RecipeIngredientList
          register={register}
          setValue={setValue}
          fields={fields}
          append={append}
          remove={remove}
          watch={watch}
          sublevel={sublevel}
          setSublevel={setSublevel}
          finalSublevel={finalSublevel}
        />
      }

      {level === 3 && 
        <RecipeTextValue
          register={register}
          errors={errors}
          watch={watch}
        />
      }

      <StButtonBox>
        <button onClick={()=>{
          levelButtonNextClickHandler();
        }}>
          {level === finalLevel ? '작성' : '다음'}
        </button>

        <button onClick={()=>{
          levelButtonPrevClickHandler();
        }}> 
          뒤로 가기
        </button>
      </StButtonBox>
      
    </StForm>
  )
};

export default RecipeCreateForm;

const StForm = styled.form`
  display: flex;
  flex-flow: column;
  text-align: center;
  gap: 5px;
`

const StButtonBox = styled.div`
  
`