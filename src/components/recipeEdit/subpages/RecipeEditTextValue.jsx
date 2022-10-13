import styled from "styled-components";

import RecipeEditInput from "../element/RecipeEditInput";
import RecipeEditTextarea from "../element/RecipeEditTextarea";
import RecipeEditIngredientConform from "../element/RecipeEditIngredientConform";

const RecipeEditTextValue = (props) => {
  const { formProps, fetchRecipe } = props;
  const { register, errors, watch } = formProps;
  const { recipeId, title, content, ingredientList, isIced, cupSize } =
    fetchRecipe;

  return (
    <>
      <StTextInputContainer>
        <div className="info_box">레시피 이름</div>

        <RecipeEditInput
          label={"title"}
          placeholder={"레시피 이름을 적어주세요."}
          defaultValue={title}
          register={register}
        />
      </StTextInputContainer>

      <RecipeEditIngredientConform
        formProps={formProps}
        fetchRecipe={fetchRecipe}
      />

      <StTextInputContainer>
        <div className="info_box">상세설명</div>

        <RecipeEditTextarea
          name={"content"}
          placeholder={"상세설명 내용을 적어주세요."}
          defaultValue={content}
          register={register}
        />

        <div className="error_box">
          {errors.content?.type === "required" && "레시피 내용을 입력해주세요."}
        </div>
      </StTextInputContainer>

      {/************** 공유하기 버튼 **************/}
      {/* 버그 수정 및 API구현 후 적용할 예정입니다. */}
      <StTextInputContainer>
        <StIsPulicBox>
          <div className="info_box">커뮤니티에 공유하기</div>

          {/* <StRangeBar isPublic={watch("isPublic")}>
            <input
              type="checkbox"
              id="publicCheckbox"
              {...register("isPublic")}
              checked
            />
            <div className="range_circle"></div>
            <label
              htmlFor="publicCheckbox"
              aria-details="커뮤니티에 공유하기"
            />
          </StRangeBar> */}
        </StIsPulicBox>
      </StTextInputContainer>
    </>
  );
};

export default RecipeEditTextValue;

const StTextInputContainer = styled.div`
  display: flex;
  flex-flow: column;

  padding: 1rem 1.2rem;
  margin-top: 10px;

  text-align: left;

  background-color: #fff;

  input,
  textarea {
    color: #393939;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.7rem;
  }

  .info_box {
    color: #aaa;
    margin-bottom: 1rem;

    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2.1rem;
  }

  .error_box {
    color: #aaa;

    min-height: 2rem;
  }

  &:last-child {
    flex: 1 1 auto;
  }

  *::placeholder {
    color: #393939 !important;
  }
`;

const StIsPulicBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .info_box {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.4rem;
  }

  display: none;
`;

const StRangeBar = styled.div`
  width: 4.6rem;
  height: 2.3rem;
  border-radius: 5rem;

  position: relative;

  background: "#393939";
  background: ${(props) => (props.isPublic ? "#393939" : "#cdcdcd")};

  .info_box {
    width: auto;
  }

  label {
    height: 100%;
    width: 100%;

    display: block;
    position: relative;

    z-index: 9;
  }

  .range_circle {
    width: 2.3rem;
    height: 100%;
    border-radius: 1.5rem;

    position: absolute;
    left: ${(props) => (props.isPublic ? "50%" : "0")};
    right: 0;

    background-color: #fff;
    border: 0.1rem solid ${(props) => (props.isPublic ? "#393939" : "#cdcdcd")};
    color: #fff;

    transition: all 0.4s;
  }

  input[type="checkbox"] {
    position: absolute;
    z-index: -9;
    opacity: 0;
  }
`;
