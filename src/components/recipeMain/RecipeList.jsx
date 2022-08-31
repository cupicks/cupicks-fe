import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const RecipeList = ({ recipe, setRecipe }) => {
  recipe = recipe.recipeList;
  const settings = {
    centerMode: true,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
  };
  return (
    <>
      <StyledSlider {...settings}>
        {recipe.map((recipes) => (
          <div key={recipes.recipeId}>
            <ListWrap>
              <ListHead>
                <div></div>
                <div>닉네임</div>
                <div>...</div>
              </ListHead>
              <ListContent>
                {recipes.ingredientList.map((ingredients) => (
                  <IngredientWrap
                    ingredientColor={ingredients.ingredientColor}
                    ingredientAmount={(
                      (ingredients.ingredientAmount / recipes.cupSize) *
                      100
                    ).toFixed(1)}
                  >
                    {ingredients.ingredientName}
                  </IngredientWrap>
                ))}
              </ListContent>
              <ListTitle>{recipes.title}</ListTitle>
            </ListWrap>
          </div>
        ))}
      </StyledSlider>
    </>
  );
};

export default RecipeList;

const IngredientWrap = styled.div`
  background-color: ${(props) => props.ingredientColor};
  height: ${(props) => props.ingredientAmount + "%"};
  color: white;
`;

const ListWrap = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
  margin: 0 auto;
  margin-top: 30px;
`;

const ListHead = styled.div`
  width: 500px;
  height: 100px;
  flex-direction: row;
  display: flex;
`;

const ListContent = styled.div`
  width: 500px;
  height: 300px;
`;

const ListTitle = styled.div`
  width: 500px;
  height: 100px;
  flex-direction: row;
  display: flex;
  border: 2px solid black;
`;

const StyledSlider = styled(Slider)`
  /* .slick-slide div {
    height: 320px;
    width: 320px;
    outline: none;
    border: 2px solid black;
  } */

  .slick-prev:before {
    opacity: 1; // 기존에 숨어있던 화살표 버튼이 보이게
    color: black; // 버튼 색은 검은색으로
    left: 0;
  }

  .slick-next:before {
    opacity: 1;
    color: black;
  }
`;
