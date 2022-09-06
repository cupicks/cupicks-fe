import RecipeRadio from "../element/RecipeRadio";

const RecipeIsIced = (props) => {
  const {cupState, setCupState, formProps, resetField, remove} = props
  const {register, trigger, getValues, setValue} = formProps
  const cupSizes = ['355ml', '473ml', '591ml']
  
  const recipeTypes = ['hot', 'ice']

  /** watch('isIced')해서 'isIcedResult' state변경
   * ice음료는 true, hot음료는 false */ 
  const isIcedSelectHandler = (e) => {
    const currValue = e.target.value; 
    const isIced = currValue === "ice";

    setCupState({
      ...cupState, 
      isIcedTag: isIced
    })
    trigger('isIced')
    resetField('ingredientList')

    if(isIced){
      setValue('ingredientList.0', {
        ingredientAmount: 200,
        ingredientColor: "#c1e9ff",
        ingredientName: "얼음"
      })
    } else {
      remove(0)
    }
  }
  
  return ( 
    <>
      <div className="info_box">
        음료 타입을 선택해주세요.
      </div>

      {recipeTypes.map((value, idx) => (  
        <RecipeRadio
          key={idx}
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