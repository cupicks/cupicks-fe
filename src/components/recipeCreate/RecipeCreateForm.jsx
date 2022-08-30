import { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import RecipeInput from "./RecipeInput";
import RecipeRadio from "./RecipeRadio";

  // const 
  //   title: '',
  //   content:  '',
  //   ingredientList: [{
  //     ingredientName: '',
  //     ingredientColor: '',
  //     ingredientAmount: 0
  //   }]
  // });

const RecipeCreateForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, 
    name: "ingrediantList"
    // keyName: "id"
  })

  let hasIsIced = watch('isIced') !== undefined
  let isIcedTrue = Boolean(Number(watch('isIced')))
  
  let hasIsPublic = watch('isPublic') !== undefined
  let isPublicTrue = Boolean(Number(watch('isPublic')))

  const onSubmit = data => {
    const isIcedBoolean = Boolean(Number(watch(data.isIced)));
    const isPublicBoolean = Boolean(Number(watch(data.isPublic)));

    const newData = {
      ...data, 
      size: Number(data.size)
    }
    console.log(newData);
  }

  // const [submitData, setSubmitData] = useState({
  //   title: '',
  //   content:  '',
  //   ingredientList: [{
  //     ingredientName: '',
  //     ingredientColor: '',
  //     ingredientAmount: 0
  //   }]
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {[355, 473, 591].map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'size'}
          value={value}
          register={register}
          config={{required: true}}
        />
      ))}
      {errors.size?.type === 'required' && "사이즈를 선택해주세요."}
      <hr style={{margin: "1em auto"}} />
      
      {[0, 1].map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'isIced'}
          value={value}
          register={register}
        />
      ))}
      { hasIsIced && ( isIcedTrue ? '얼음' : '핫' )}
      <hr style={{margin: "1em auto"}} />

      {[0, 1].map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'isPublic'}
          value={value}
          register={register}
        />
      ))}
      { hasIsPublic && ( isPublicTrue ? '공유' : '비공개' )}
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
            step={50}
            placeholder={`재료 ${idx}`}
            {...register(`ingrediantList.${idx}.ingredientAmount`)}
          />
        </div>
      ))}
      <button 
        type="button" 
        onClick={()=>{
          append()
      }}>
        추가
      </button>
      <hr style={{margin: "1em auto"}} />

      <RecipeInput 
        label={"title"} 
        register={register}
        config={{required: true}}
      />
      {errors.title?.type === 'required' && "레시피 이름을 입력해주세요."}

      <hr style={{margin: "1em auto"}} />

      <button>
        submit
      </button>
    </form>
  )
};

export default RecipeCreateForm;