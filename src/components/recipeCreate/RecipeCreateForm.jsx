import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import Navigation from "../../partial/Navigation";
import RecipeCupSize from "./subpages/RecipeCupSize";
import RecipeIsIced from "./subpages/RecipeIsIced";
import RecipeTextValue from "./subpages/RecipeTextValue";
import RecipeIngredientList from "./subpages/RecipeIngredientList";

import { setDataType } from '../../util/recipeSetDataType'

import styled from "styled-components";

const RecipeCreateForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, trigger, watch, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "ingrediantList" })

  const [level, setLevel] = useState(0)
  const finalLevel = 3;

  const [sublevel, setSublevel] = useState(0);
  const finalSublevel = 2;

  const [cupStyleHeight, setCupStyleHeight] = useState(0);

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

  /** 'cupSize' radio에 props drilling로 넘겨준 onClick함수 */
  const onClickCupSize = (e) => {
    const currCup = (""+e.target.textContent).split('ml')[0];
    setCupStyleHeight((+currCup / 591 * 100).toFixed(1))
    
    setValue('cupSize', currCup)
    trigger('cupSize') // errors 지우기
    setValue('ingrediantList', [])
  }

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
      
      <Navigation empty={true}>
        <button onClick={()=>{
          if(level === 0) navigate(-1);
          levelButtonPrevClickHandler();
        }}> 
          {level === 0 ? '취소' : '이전'}
        </button>

        <h4>레시피 만들기</h4>

        <button onClick={()=>{
          levelButtonNextClickHandler();
        }}>
          {level === finalLevel ? '저장' : '다음'}
        </button>
      </Navigation>

      {level !== 3 && 
        <StRecipeVisualContainer>
          <StRecipeVisual ingredient_height={cupStyleHeight}>
            <div className="ingredient_outline fcc">
              {level === 2 &&
                <>
                  <button 
                    type="button" 
                    onClick={()=>{
                      append()
                      setSublevel(0)
                  }}>
                    +
                  </button>
                  <button 
                    type="button" 
                    onClick={()=>{
                      remove(fields.length-1)
                  }}>
                    x
                  </button>
                </>
              }         
            </div>
          </StRecipeVisual>
        </StRecipeVisualContainer>
      }

      { level !== 3 &&
        <StRecipeOptContainer>
          {level === 0 && 
            <RecipeCupSize
              register={register}
              setValue={setValue}
              errors={errors}
              watch={watch}
              trigger={trigger}
              onClickCupSize={onClickCupSize}
            />
          }

          {level === 1 &&
            <RecipeIsIced 
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
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
        </StRecipeOptContainer>
      }

      {level === 3 && 
        <RecipeTextValue
          register={register}
          errors={errors}
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

const StRecipeVisualContainer = styled.div`
  /* 전체 높이에서 헤더와 하단 영역 제외 */
  height: calc(100vh - 60px - 150px);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;
`

const StRecipeVisual = styled.div`
  width: 70%;
  height: 80%;

  margin: 0 auto;
  
  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  position: relative;

  border: 0.5em solid #ddd;
  border-top: 0;

  .ingredient_outline {
    height: ${props => props.ingredient_height+ '%'};

    transition: height .5s;

    border: 3px dashed #555;
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
    min-height: 30px;
    
    color: #222;

    text-align: left;
    line-height: 30px;
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