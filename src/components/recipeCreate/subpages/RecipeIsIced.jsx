import { useState } from 'react'
import RecipeRadio from "../element/RecipeRadio";

const RecipeIsIced = (props) => {
  const {register, errors, watch, trigger} = props;
  const [isIcedResult, setIsIcedResult] = useState('');

  /** isIced를 watch해서 'isIcedResult' state를 set하는 함수 */ 
  const isIcedSelectHandler = () => {
    const isIced = watch('isIced');
    let isTrue = Boolean(isIced) && isIced === '1'
    let result = isTrue ? 'Iced' : 'Hot';
    
    setIsIcedResult(result)
    trigger('isIced')
  }
  
  return ( 
    <>
      {[0, 1].map((value, idx) => (  
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
      { errors.isIced?.type === 'required' && "음료 타입을 선택해주세요." }
      { isIcedResult }
    </>
  )
}

export default RecipeIsIced;