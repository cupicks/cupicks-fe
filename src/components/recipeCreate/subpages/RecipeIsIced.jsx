import { useEffect } from "react";
import RecipeRadio from "../element/RecipeRadio";

const RecipeIsIced = (props) => {
  const {setCupState, formProps, formArrayProps, step} = props
  
  const {register, errors, clearErrors} = formProps
  const {append, remove} = formArrayProps
  
  const recipeTypes = ['hot', 'ice']

  /** watch('isIced')해서 'isIcedResult' state변경
   * ice음료는 true, hot음료는 false */ 
  const isIcedClickHandler = (e) => {
    const currValue = e.target.textContent; 
    const isIced = currValue === "ice";

    setCupState(prev => ({
      ...prev, 
      isIcedTag: isIced
    }))
    clearErrors();
    
    if(isIced){
      const ice = {
        id:'default_id',
        ingredientAmount: 200,
        ingredientColor: "#c1e9ff",
        ingredientName: "얼음"
      }
      append(ice);
      
    } else {
      remove()
    }
  }
  
  return ( 
    <>
      <div className="info_box">
        음료 타입을 선택해주세요.
      </div>

      {recipeTypes.map((value) => (  
        <RecipeRadio
          key={value}
          label={'isIced'}
          value={value}
          register={register}
          onClick={isIcedClickHandler}    
          config={{
            required: {
              value: 'required',
              message: "음료 타입을 선택해주세요."
            }
          }}
        />
      ))}

      <div className="error_box">
        {/* {step === 1 && errors.isIced? errors.isIced.message : "" } */}
      </div>
    </>
  )
}

export default RecipeIsIced;