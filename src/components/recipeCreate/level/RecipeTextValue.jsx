import { useState } from 'react'
import RecipeInput from "../RecipeInput";
import RecipeRadio from "../RecipeRadio";

const RecipeTextValue = (props) => {
  const { register, errors, watch } = props;
  const [isPublicResult, setIsPublicResult] = useState('');

  /** isPublic를 watch해서 'isPublicResult' state를 set하는 함수 */ 
  const isPublicSelectHandler = () => {
    const isPublic = watch('isPublic');
    let isNotUndefined = Boolean(isPublic);
    let isTrue = isNotUndefined && isPublic === '1'
    let result = isTrue ? '나만 보기' : '공유';
    setIsPublicResult(result)
  }

  return ( 
    <>
      <RecipeInput 
        label={"title"} 
        register={register}
        config={{
          required: true
        }}
      />
      {errors.title?.type === 'required' && "레시피 이름을 입력해주세요."}
      
      {[0, 1].map((value, idx) => {
        let opt = { required: true }

        return (
          <RecipeRadio
            key={idx}
            label={'isPublic'}
            value={value}
            config={opt}
            register={register}
            onChange={isPublicSelectHandler}
          />
        )
      })}
      { isPublicResult }
    </>
  )
}

export default RecipeTextValue;