import RecipeRadio from "../element/RecipeRadio";

const RecipeCupSize = (props) => {
  const {register, setValue, errors, trigger, onClickCupSize, watch} = props;
  const cupSizes = [355, 473, 591]

  return ( 
    <>
      {cupSizes.map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'cupSize'}
          value={value}
          register={register}
          onClick={onClickCupSize}
          config={{required: true}}
        />
      ))}
      <div className="error_box">
        {errors.cupSize?.type === 'required' && "사이즈를 선택해주세요."}
      </div>
    </>
  )
}

export default RecipeCupSize;