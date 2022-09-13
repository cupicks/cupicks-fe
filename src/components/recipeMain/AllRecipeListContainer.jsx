import React from "react";
import styled from "styled-components";
import AllRecipeListIngredient from "./AllRecipeListIngredient";

import talk from "../../assets/svg/talk.svg";
import like from "../../assets/svg/like_m.svg";

const AllRecipeListContainer = (props) => {
  // const { recipeId, ingredientList, title, cupSize } = props.allrecipes;
  const { id, author } = props.allrecipes;
  // console.log(props.allrecipes.data);
  // console.log(props.allrecipes);
  return (
    <div key={id}>
      <StListWrap>
        <StListHead>
          <StListProfile></StListProfile>
          <StNickname>닉네임</StNickname>
        </StListHead>
        <StListContent>
          {/* {ingredientList.map((ingredients) => (
            <AllRecipeListIngredient
              ingredients={ingredients}
              cupSize={cupSize}
            />
          ))} */}
        </StListContent>
        <StListTitle>
          <div className="title">{author}</div>
          <StItemSet>
            <img className="talk_btn" src={talk} />
            <img className="like_btn" src={like} />
          </StItemSet>
        </StListTitle>
      </StListWrap>
    </div>
  );
};

export default AllRecipeListContainer;

// const StList = styled.div`
//   background-color: #fff;
// `;

const StListWrap = styled.div`
  width: 30vw;
  /* width: 7rem; */
  height: 200px;
  border-radius: 12px;

  margin: 0 auto;
  margin-top: 5px;

  display: flex;
  flex-flow: column;

  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
`;

const StListHead = styled.div`
  height: 25px;

  display: flex;
  flex-flow: row;
  align-items: center;

  background-color: #ffffff;

  border-radius: 12px;
  /* border-top: 2px solid #e6e6e6; */
`;

const StListProfile = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  border: 2px solid gray;

  margin-left: 0.3rem;
`;

const StNickname = styled.div`
  margin-left: 5px;

  font-size: 8px;
  font-weight: bold;
  padding-top: 0.5rem;
`;

const StListContent = styled.div`
  height: 150px;

  display: flex;
  flex-flow: column-reverse;
  border-top: 2px solid #f8f7f8;
`;

const StListTitle = styled.div`
  height: 25px;
  border-radius: 12px;

  padding-left: 0.5rem;
  padding-bottom: 1rem;
  padding-top: 0.7rem;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;

  border-bottom: 2px solid #e6e6e6;

  font-size: 12px;

  .title {
    font-size: 0.5rem;
    font-weight: bold;
  }
`;

const StItemSet = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  /* align-items: center; */

  gap: 8px;

  .talk_btn {
    width: 0.8rem;
    height: 0.8rem;
  }
  .like_btn {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
