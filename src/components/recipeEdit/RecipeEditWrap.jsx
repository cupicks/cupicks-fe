import { useForm } from "react-hook-form";

import api from "../../server/api";

import RecipeEditFormContainer from "./RecipeEditFormContainer";
import Navigation from "../../partial/Navigation";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecipeEditForm = (props) => {
  const navigate = useNavigate();

  const { fetchRecipe } = props;
  const {
    recipeId,
    title,
    content,
    ingredientList,
    isPublic,
    isIced,
    cupSize,
  } = fetchRecipe;

  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const formProps = {
    register,
    watch,
    setValue,
    getValues,
    reset,
    errors,
    trigger,
    clearErrors,
    setError,
  };

  /** onSumit 시 */
  const onSubmit = (data) => {
    event.preventDefault();
    let newTitle = title;
    let newContent = content;

    if (data.title !== "") {
      newTitle = data.title;
    }
    if (data.content !== "") {
      newContent = data.content;
    }

    const newData = {
      title: newTitle,
      content: newContent,
      ingredientList: ingredientList,
      isIced: Boolean(isIced),
      isPublic: Boolean(isPublic),
    };

    recipeEditing(newData);
  };

  const recipeEditing = async (newData) => {
    let contentType = "application/json";

    try {
      const response = await api(contentType)
        .put(`/recipes/${recipeId}`, newData)
        .then((res) => {
          console.log(res);
          navigate(`/recipe/${recipeId}/detail`, {
            state: { message: "레시피가 수정되었습니다." },
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StFormWrap onSubmit={handleSubmit(onSubmit)}>
      <Navigation>
        <div className="title">레시피 수정</div>
        <button>저장</button>
      </Navigation>

      <RecipeEditFormContainer
        formProps={formProps}
        fetchRecipe={fetchRecipe}
      />
    </StFormWrap>
  );
};

export default RecipeEditForm;

const StFormWrap = styled.form`
  height: 100%;

  display: flex;
  flex-flow: column;

  background-color: #eee;
`;
