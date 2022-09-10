import { useState } from 'react'
import styled from 'styled-components';

import RecipeInput from "../element/RecipeInput";
import RecipeTextarea from '../element/RecipeTextarea';

const RecipeTextValue = (props) => {
  const { cupState, setCupState, formProps } = props;
  const { isPublicTag } = cupState;
  const { register, errors } = formProps

  /** isPublic를 watch해서 'isPublicResult' state를 set하는 함수 */ 
  const isPublicSelectHandler = (e) => {
    setCupState({...cupState, isPublicTag: !e.target.checked});
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
          
          <StRangeBar isPublic={isPublicTag}>
            <input 
              type="checkbox" 
              id='publicCheckbox'
              value={ true }
              {...register('isPublic')}
              onChange={ isPublicSelectHandler } 
              />
            <label 
              htmlFor='publicCheckbox'
            >
            </label>
          </StRangeBar>

          {isPublicTag === "1" && "공유"}
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
  height: 25px;
  border-radius: 26px;
  
  position: relative;

  background: #555;
  
  .info_box {
    width: auto;
  }

  input[type="checkbox"] {
    position: absolute;
  }
  
  label {
    width: 30px;
    height: 100%;
    border-radius: 15px;

    position: absolute;
    left: ${props => props.isPublic?'0':'50%'};
    right: 0;

    background-color: #fff;
    border: 1px solid #555;
    color: #fff;

    transition: all .4s;
  }

  input {
    z-index: -9;
    opacity: 0;
  }

  *::placeholder {
    color: #ccc;
    font-size: 1.1rem;
  }
`