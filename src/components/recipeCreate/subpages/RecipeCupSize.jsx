import RecipeRadio from "../element/RecipeRadio";

const RecipeCupSize = (props) => {
  const {cupState, setCupState, formProps, resetField} = props
  const {setValue, register, errors} = formProps
  const cupSizes = ['355ml', '473ml', '591ml']

  /** 'cupSize' radio에 props drilling로 넘겨준 onClick함수 */
  const onClickCupSize = (e) => {
    const currCupSize = +(""+e.target.textContent).split('ml')[0];
    setCupState({
      ...cupState, 
      currCupSize: currCupSize, 
      cupStyleHeight : +(+currCupSize / 591 * 100).toFixed(1)
    })
    
    setValue('cupSize', currCupSize)
    resetField('ingredientList')
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
          onClick={onClickCupSize}
          config={{
            required: {
              value: 'required',
              message: "사이즈를 선택해주세요."
            }
          }}
        />
      ))}

      <div className="error_box">
        {errors.cupSize?.type === 'required' ? errors.cupSize.message : "" }
      </div>
    </>
  )
}

export default RecipeCupSize;