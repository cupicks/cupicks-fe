import { useState } from 'react'
import styled from 'styled-components';

import RecipeInput from "../element/RecipeInput";
import RecipeRadio from "../element/RecipeRadio";
import RecipeTextarea from '../element/RecipeTextarea';

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
      <StTextInputContainer>
        <div className="info_box">
          레시피 이름
        </div>

        <RecipeInput 
          label={"title"} 
          placeholder={"레시피 이름을 적어주세요."}
          register={register}
          config={{
            required: true
          }}
        />
      </StTextInputContainer>
      
      <StTextInputContainer>
        <div className="info_box">
          상세설명
        </div>

        <RecipeTextarea 
          name={"content"}
          placeholder={'상세설명 내용을 적어주세요.'}
          register={register}
          config={{
            required: true
          }}
        />

        <div className="error_box">
          {errors.content?.type === 'required' && "레시피 내용을 입력해주세요."}
        </div>
      </StTextInputContainer>

      <StTextInputContainer>
        <StIsPulicBox>
          <div className="info_box">
            커뮤니티에 공유하기
          </div>
          
          <StRangeBar>
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
          </StRangeBar>
        </StIsPulicBox>
      </StTextInputContainer>

      <StTextInputContainer />
    </>
  )
}

export default RecipeTextValue;

const StTextInputContainer = styled.div`
  display: flex;
  flex-flow: column;

  padding: 1rem 1.2rem;
  margin-top: 10px;

  text-align: left;

  background-color: #fff;

  .info_box {
    color: #aaa;
    margin-bottom: 5px;
  }

  .error_box {
    color: #aaa;

    min-height: 20px;
  }

  &:last-child {
    flex: 1 1 auto;
  }
`

const StIsPulicBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const StRangeBar = styled.div`
  width: 60px;
  height: 26px;
  border-radius: 26px;
  
  display: flex;

  background: #222;
  
  .info_box {
    width: auto;
  }

  input[type="radio"] {
    position: absolute;
    display: none;
    z-index: -9;
    opacity: 0;
  }
  
  label {
    width: 30px;
    height: 100%;
    border-radius: 15px;

    background-color: #fff;
    border: 1px solid #222;
    color: #fff;
  }

  input:checked + label {
    opacity: 0;
    background-color: var(--button-activeBackgroundColor);
    color: var(--button-activeColor);
  }

  *::placeholder {
    color: #ccc;
    font-size: 1.1rem;
  }
`