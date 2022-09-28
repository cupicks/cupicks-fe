import { useEffect, useState } from "react";

import styled from "styled-components";
import styledElementComponents from "../../styles/customElementStyle";
const { CustomProfilePic, CustomIconBox } = styledElementComponents;

import AllRecipeListIngredient from "./AllRecipeListIngredient";

import talk from "../../assets/svg/talk.svg";
import dislikes from "../../assets/svg/like_m.svg";
import likes from "../../assets/svg/like_fill_m.svg";

import { useNavigate } from "react-router-dom";

import api from "../../server/api";

const AllRecipeListContainer = (props) => {
  const { allrecipes, modalProps, getItems, page } = props;

  const {
    recipeId,
    ingredientList,
    title,
    cupSize,
    isIced,
    nickname,
    resizedUrl,
    imageUrl,
    isLiked,
  } = allrecipes;
  const { userLogin, needLogginModal, setNeedLogginModal, timer } = modalProps;

  const navigate = useNavigate();
  const [liked, setLiked] = useState(isLiked);
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });

  const profileImage = resizedUrl;
  const cupHeight = ((cupSize / 591) * 100).toFixed();

  // 브라우저 너비에 따라서 글자 수를 자릅니다.
  const windowWidth = windowSize.width;
  let titleText = title;
  if (title.length > 11) {
    titleText = title.slice(0, 11) + "...";
  }

  if (windowWidth < 450) {
    if (title.length > 4) {
      titleText = title.slice(0, 4) + "...";
    }
  } else if (windowWidth < 500) {
    if (title.length > 7) {
      titleText = title.slice(0, 7) + "...";
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  /** 레시피 좋아요 버튼 핸들러 */
  const likeCard = async () => {
    // 로그인이 안되어 있다면 모달창을 띄우고 함수를 종료합니다.
    if (!userLogin) {
      if (!needLogginModal) {
        setNeedLogginModal(true);
        setTimeout(() => {
          setNeedLogginModal(false);
        }, timer);
      }
      return;
    }

    let contentType = "application/json";
    //liked(isLiked)가 false일 때, 좋아요를 누를 수 있습니다.
    if (liked === false) {
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/like`)
          .then((res) => {
            getItems();
            console.log(res);
          });
        setLiked((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    } else {
      // liked(isLiked)가 false
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/dislike`)
          .then((res) => {
            getItems();
            console.log(res);
          });
        setLiked((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <StListHead>
        <CustomProfilePic profileImage={profileImage} />
        <StNickname>{nickname}</StNickname>
      </StListHead>

      <StListContent
        onClick={() => {
          navigate(`${recipeId}/detail`);
        }}
      >
        <StCupHeight cupHeight={cupHeight}>
          {ingredientList.map((ingredients, idx) => {
            // 재료가 얼음일 때를 제외합니다.
            if (isIced && idx === 0) return null;
            return (
              <AllRecipeListIngredient
                ingredients={ingredients}
                cupSize={cupSize}
                isIced={isIced}
                key={"allRecipeListIngredient" + idx}
              />
            );
          })}
        </StCupHeight>
      </StListContent>

      <StListDesc>
        <div className="title">{titleText}</div>
        <StIconBox>
          <img
            className="talk_btn icon"
            src={talk}
            onClick={() => {
              navigate(`${recipeId}/comment`, { state: title });
            }}
          />
          {liked === false ? (
            <img className="like_btn icon" src={dislikes} onClick={likeCard} />
          ) : (
            <img className="like_btn icon" src={likes} onClick={likeCard} />
          )}
        </StIconBox>
      </StListDesc>
    </>
  );
};

export default AllRecipeListContainer;

const StListHead = styled.div`
  height: 2.5rem;
  padding: 0.2rem 0.7rem 0;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  box-shadow: 0 2px 0 #eeeeee;
`;

const StNickname = styled.div`
  color: #101010;

  font-weight: 600;
  font-size: 1rem;
`;

const StListContent = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-flow: column-reverse;

  border-top: 0.2rem solid #f8f7f8;
`;

const StCupHeight = styled.div`
  height: ${(props) => props.cupHeight + "%"};

  display: flex;
  flex-flow: column-reverse;
`;

const StListDesc = styled.div`
  min-height: 2rem;
  padding: 0.4rem 0.7rem 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;

  .title {
    font-weight: 600;
    font-size: 1rem;
  }
`;

const StIconBox = styled(CustomIconBox)`
  .talk_btn {
    width: 0.9rem;
  }
  .like_btn {
    width: 1.1rem;
  }
`;
