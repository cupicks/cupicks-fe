import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import RecipeInput from "./RecipeInput";
import RecipeRadio from "./RecipeRadio";

import RecipeCupSize from "./level/RecipeCupSize";
import RecipeIsIced from "./level/RecipeIsIced";
import RecipeTextValue from "./level/RecipeTextValue";
import RecipeIngredientList from "./level/RecipeIngredientList";

const RecipeCreateForm = () => {
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();

  const { fields, append, remove } = useFieldArray({
    control, 
    name: "ingrediantList"
  })
  
  const isIced = watch('isIced');
  let isIcedUndefined = isIced === undefined
  let isIcedTrue = !isIcedUndefined && isIced === '1'
  
  const isPublic = watch('isPublic');
  let isPublicUndefined = isPublic === undefined
  let isPublicTrue = !isPublicUndefined && isPublic === '1'

  const onSubmit = data => {
    console.log(JSON.stringify(data))
    const isPublicTrue = data.isPublic === '1' ? true : false;
    const isIcedTrue = data.isIced === '1' ? true : false;
    const newIngrediantList = data.ingrediantList.map(list =>(
      {...list, ingredientAmount: Number(list.ingredientAmount) }
    )) 

    console.log({
      ...data,
      cupSize: Number(data.cupSize),
      isIced: isIcedTrue,
      isPublic: isPublicTrue,
      ingrediantList: newIngrediantList
    });
  }


  const numberPositiveInteger = (value) => {
    return Math.floor(Math.abs(Number(value)));
  }

  const calcAmount = (e) => {
    const newList = watch('ingrediantList');
    const currCupSize = Number(watch('cupSize'));
    const idx = e.target.id;
    
    // max: 현재 컵 용량
    let eventAmount = numberPositiveInteger(e.target.value);
    eventAmount = eventAmount > currCupSize ? currCupSize : eventAmount;

    // sumArray: 배열의 ingredientAmount 합
    let sumArray;
    if(newList.length > 1){
      sumArray = newList.reduce((x, curr) => {
        const amount_x = numberPositiveInteger(x.ingredientAmount);
        const amount_curr = numberPositiveInteger(curr.ingredientAmount);
        return amount_x + amount_curr
      })
    } else {
      sumArray = numberPositiveInteger(newList[0].ingredientAmount);
    }

    console.log(sumArray);

    // 컵 용량보다 sumArray가 크다면(용량이 넘치면)
    // 500까지인데 기존 200 + 400이면 
    if(currCupSize < sumArray){
      const overThisMuch = sumArray - currCupSize;
      console.log(abs(overThisMuch));
      setValue(`ingrediantList.${idx}.ingredientAmount`, eventAmount - overThisMuch)
    } else {
      setValue(`ingrediantList.${idx}.ingredientAmount`, eventAmount)
    }

    // amountLeft: 컵 용량에서 sumArray를 뺀 값
    const amountLeft = currCupSize - sumArray;
  }

  const [level, setLevel]=useState(0)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <RecipeCupSize
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <hr style={{margin: "1em auto"}} />
      <RecipeIsIced />
      <RecipeIngredientList />
      <RecipeTextValue />

      
      
      {[0, 1].map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'isIced'}
          value={value}
          register={register}
        />
      ))}
      { !isIcedUndefined && ( isIcedTrue ? '얼음' : '핫' )}
      <hr style={{margin: "1em auto"}} />
      
      {fields.map((field, idx) => (
        <div
          key={field.id}
        >
          <input 
            type="text" 
            placeholder={`재료 ${idx}`}
            {...register(`ingrediantList.${idx}.ingredientName`)}
          />

          <select 
            {...register(`ingrediantList.${idx}.ingredientColor`)}
          >
            <option value="#000000">옵션1</option>
            <option value="#111111">옵션2</option>
            <option value="#222222">옵션2</option>
          </select>

          <input 
            type="number"
            placeholder={ `재료 ${idx}` }
            id={ idx }
            max={ 1000 }
            {...register(`ingrediantList.${idx}.ingredientAmount`, {
              max: {
                value: 1000,
                message: "1000이하로 입력"
              }
            })}
            onBlur={(e)=>{
              calcAmount(e);
            }}
            onChange={(e)=>{
              const value = String(e.target.value)
              const currValue = value.length > 4 ? Number(value.slice(0, 4)) : Number(value);

              setValue(`ingrediantList.${idx}.ingredientAmount`, currValue)
            }}
          />
        </div>
      ))}

      <button 
        type="button" 
        onClick={()=>{
          append()
      }}>
        재료 추가
      </button>
      <button 
        type="button" 
        onClick={()=>{
          remove(fields.length-1)
      }}>
        재료 삭제
      </button>
      <hr style={{margin: "1em auto"}} />

      <RecipeInput 
        label={"title"} 
        register={register}
      />
      {errors.title?.type === 'required' && "레시피 이름을 입력해주세요."}

      <br />
      
      {[0, 1].map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'isPublic'}
          value={value}
          register={register}
        />
      ))}
      { !isPublicUndefined && ( isPublicTrue ? '공유' : '비공개' )}

      <hr style={{margin: "1em auto"}} />

      <button>
        submit
      </button>
    </form>
  )
};

export default RecipeCreateForm;