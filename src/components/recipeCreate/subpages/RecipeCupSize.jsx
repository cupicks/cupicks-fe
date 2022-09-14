import RecipeRadio from "../element/RecipeRadio";

const RecipeCupSize = (props) => {
  const {cupState, setCupState, formProps, formArrayProps} = props
  
  const {isIcedTag} = cupState
  const {setValue, register, errors, clearErrors} = formProps
  const {remove, append} = formArrayProps
  
  const cupSizes = ['355ml', '473ml', '591ml']

  /** 'cupSize' radio에 props drilling로 넘겨준 onClick함수 */
  const cupSizeClickHandler = (e) => {
    const currCupSize = +(""+e.target.textContent).split('ml')[0];
    setCupState({
      ...cupState, 
      currCupSize: currCupSize, 
      cupStyleHeight : +(+currCupSize / 591 * 100).toFixed(1)
    })
    
    setValue('cupSize', currCupSize)
    clearErrors()
    
    if(isIcedTag){
      remove()
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
        사이즈를 선택해주세요.
      </div>

      {cupSizes.map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'cupSize'}
          value={value}
          register={register}
          onClick={cupSizeClickHandler}
          config={{
            required: {
              value: 'required',
              message: "사이즈를 선택해주세요."
            }
          }}
        />
      ))}

      <div className="error_box">
        {errors.cupSize? errors.cupSize.message : "" }
      </div>
    </>
  )
}

export default RecipeCupSize;