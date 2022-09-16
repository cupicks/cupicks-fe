import React from "react";

import styled from "styled-components";

import AllRecipeListIngredient from "./AllRecipeListIngredient";

import talk from "../../assets/svg/talk.svg";
import like from "../../assets/svg/like_m.svg";

import { useNavigate } from "react-router-dom";

const AllRecipeListContainer = (props) => {
  const { recipeId, ingredientList, title, cupSize, nickname, resizedUrl, imageUrl } = props.allrecipes;
  const navigate = useNavigate();
  // console.log(props.allrecipes.data);
  // console.log(props.allrecipes);
  console.log(props.allrecipes);

  const cupHeight = (cupSize / 591 * 100).toFixed()
  // 추후 resizeUrl로 변경
  const profileImage = imageUrl

  return (
    <>
      <StListHead>
        <StListProfile 
          profileImage={profileImage}
        />
        <StNickname>
          {nickname}
        </StNickname>
      </StListHead>

      <StListContent
        onClick={()=>{
          navigate(`${recipeId}/detail`)
        }}
      >
        <StCupHeight cupHeight={cupHeight}>
          {ingredientList.map((ingredients, idx) => (
            <AllRecipeListIngredient
              ingredients={ingredients}
              cupSize={cupSize}
              key={'allRecipeListIngredient'+idx}
            />
          ))}
        </StCupHeight>
      </StListContent>

      <StListDesc>

        <div className="title">{title}</div>
        <StIconSet>
          <img 
            className="talk_btn" 
            src={talk} 
            onClick={()=>{
              navigate(`${recipeId}/comment`)
            }}
          />
          {/* <img className="like_btn" src={like} /> */}
        </StIconSet>

      </StListDesc>
    </>
  );
};

export default AllRecipeListContainer;

const StListHead = styled.div`
  height: 23px;
  padding: 0 5px;

  display: flex;
  align-items: center;
  gap: 5px;
  
  box-shadow: 0 2px 0 #eeeeee;
`;

const StListProfile = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;

  border: 1px solid #b6b6b6;
  background:#eee url(${props => props.profileImage}) no-repeat center / cover;
`;

const StNickname = styled.div`
  color: #101010;
  
  font-weight: 600;
  font-size: 6.5px;
  `;

const StListContent = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-flow: column-reverse;
  
  border-top: 2px solid #f8f7f8;
`;

const StCupHeight = styled.div`
  height: ${props=>props.cupHeight+"%"};

  display: flex;
  flex-flow: column-reverse;
`

const StListDesc = styled.div`
  min-height: 20px;
  padding: 4px 5.5px 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;

  .title {
    font-weight: 600;
    font-size: 7px;
    line-height: 150%;
  }
`;

const StIconSet = styled.div`
  display: flex;
  gap: 4px;

  .talk_btn {
    width: 9px;
    cursor: pointer;
  }
  .like_btn {
    width: 11px;
    cursor: pointer;
  }
`;
