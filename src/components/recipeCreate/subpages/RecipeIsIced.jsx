import RecipeRadio from "../element/RecipeRadio";

const RecipeIsIced = (props) => {
  const {cupState, setCupState, formProps, formArrayProps} = props
  
  const {register, trigger, setValue, getValues} = formProps
  const {append, remove, resetField} = formArrayProps
  
  const recipeTypes = ['hot', 'ice']

  /** watch('isIced')해서 'isIcedResult' state변경
   * ice음료는 true, hot음료는 false */ 
  const isIcedSelectHandler = (e) => {
    const currValue = e.target.value; 
    const isIced = currValue === "ice";

    setCupState(prev => ({
      ...prev, 
      isIcedTag: isIced
    }))
    trigger('isIced')
    
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
          config={{
            required: true
          }}
          onChange={isIcedSelectHandler}
        />
      ))}
    </>
  )
}

export default RecipeIsIced;