import { useForm } from "react-hook-form";

const RecipeCupSize = (props) => {
  const {register, setValue, formState: { errors }} = useForm();

  const onChangeCupSize = () => {
    setValue('ingrediantList', [])
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
        />
      ))}
      {errors.cupSize?.type === 'required' && "사이즈를 선택해주세요."}
    </>
  )
}

export default RecipeCupSize;