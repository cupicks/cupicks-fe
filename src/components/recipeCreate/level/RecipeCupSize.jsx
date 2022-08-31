import RecipeRadio from "../RecipeRadio";

const RecipeCupSize = (props) => {
  const {register, setValue, errors, trigger} = props;

  const onChangeCupSize = () => {
    setValue('ingrediantList', [])
    trigger('cupSize')
  }
  return ( 
    <>
      {[355, 473, 591].map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'cupSize'}
          value={value}
          register={register}
          onChange={onChangeCupSize}
          config={{required: true}}
        />
      ))}
      {errors.cupSize?.type === 'required' && "사이즈를 선택해주세요."}
    </>
  )
}

export default RecipeCupSize;