import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import RecipeCupSize from "./level/RecipeCupSize";
import RecipeIsIced from "./level/RecipeIsIced";
import RecipeTextValue from "./level/RecipeTextValue";
import RecipeIngredientList from "./level/RecipeIngredientList";
import styled from "styled-components";

const RecipeCreateForm = () => {
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({
    control, 
    name: "ingrediantList"
  })

  const [level, setLevel] = useState(0)
  const finalLevel = 3;

  /** submit할 데이터 형변환 + finalLevel일 때 데이터 보내는 함수 */
  const onSubmit = data => {
    const isPublicTrue = data.isPublic === '1' ? true : false;
    const isIcedTrue = data.isIced === '1' ? true : false;
    const newIngrediantList = data.ingrediantList.map(list =>(
      {...list, ingredientAmount: Number(list.ingredientAmount) }
    )) 

    // level === finalLevel일 때 request할 예정
    console.log({
      ...data,
      cupSize: Number(data.cupSize),
      isIced: isIcedTrue,
      isPublic: isPublicTrue,
      ingrediantList: newIngrediantList
    });
  }

  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      
      {level === 0 && 
        <RecipeCupSize
          register={register}
          setValue={setValue}
          errors={errors}
        />
      }

      {level === 1 &&
        <RecipeIsIced 
          register={register}
          errors={errors}
          watch={watch}
        />
      }

      {level === 2 && 
        <RecipeIngredientList
          register = { register }
          setValue = { setValue }
          fields = { fields }
          append = { append }
          remove = { remove }
        />
      }

      {level === 3 && 
        <RecipeTextValue
          register={register}
          errors={errors}
          watch={watch}
        />
      }

      <button onClick={()=>{
        level < finalLevel ? setLevel(prev => prev + 1) : ''
      }}>
        submit
      </button>
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