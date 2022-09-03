import RecipeRadio from "../element/RecipeRadio";

const RecipeIsIced = (props) => {
  const {register, trigger, cupState, setCupState} = props;
  const {isIcedTag} = cupState
  
  const recipeTypes = ['hot', 'ice']

  /** watch('isIced')해서 'isIcedResult' state변경
   * ice음료는 true, hot음료는 false */ 
  const isIcedSelectHandler = (e) => {
    const currValue = e.target.value; 
    const isIced = currValue === "ice";

    setCupState({...cupState, isIcedTag: isIced})
    trigger('isIced')
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