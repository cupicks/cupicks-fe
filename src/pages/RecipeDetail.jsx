import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import api from "../server/api";

import IsIcedIcon from "../components/recipeDetail/element/IsIcedIcon";
import IngredientsContainer from "../components/recipeDetail/IngredientsContainer";
import RecipeDesc from "../components/recipeDetail/RecipeDesc";
import Navigation from "../partial/Navigation";
import ToastMessage from "../components/elements/modal/ToastMessage";
import ConfirmBox from "../components/elements/modal/ConfirmBox";

import styled from "styled-components";

const RecipeDetail = () => {
  // location state로 메시지 모달창 출력
  const location = useLocation();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState("");
  const navigate = useNavigate();

  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const messageText = location.state?.message;
  const timer = 1800;
  const [needLoginModal, setNeedLoginModal] = useState(false);
  const modalProps = {
    needLoginModal,
    setNeedLoginModal,
    timer,
  };

  /**************************/
  /** 레시피 삭제 버튼 핸들러 */
  const recipeDeleteButtonClickHandler = () => {
    setShowConfirmBox(true);
  };

  const recipeDeleteConfirm = () => {
    setShowConfirmBox(false);
    recipeDeleting();
  };

  const recipeDeleteDenied = () => {
    setShowConfirmBox(false);
  };

  const confirmProps = {
    recipeDeleteButtonClickHandler,
    recipeDeleteConfirm,
    recipeDeleteDenied,
  };

  const recipeDeleting = async () => {
    let contentType = "application/json";

    try {
      const response = await api(contentType).delete(`/recipes/${recipeId}`);
      navigate("/recipe", { state: { message: "메시지가\n삭제 되었습니다." } });
    } catch (err) {
      console.log(err);
      navigate("/404");
    }
  };

  // umount시 메시지 체크
  useEffect(() => {
    if (messageText !== undefined) {
      setMessageModal(true);
      setTimeout(() => {
        setMessageModal(false);
      }, timer);
    }
  }, []);
  const recipefetching = async () => {
    let contentType = "application/json";
    try {
      const response = await api(contentType).get(`/recipes/${recipeId}`);
      setRecipe(response.data.recipe);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      navigate("/404");
    }
  }, [recipe.isLiked]);

  useEffect(() => {
    recipefetching();
  }, []);
  return (
    <StWrap>
      {recipe && (
        <>
          <Navigation>
            <div className="fcc">
              <IsIcedIcon isIced={recipe.isIced} />
            </div>
          </Navigation>

          <IngredientsContainer recipe={recipe} />
          <RecipeDesc recipe={recipe} modalProps={modalProps} confirmProps={confirmProps}/>
        </>
      )}
      {needLoginModal && (
        <ToastMessage
          text={"좋아요는 로그인이\n 필요한 기능입니다."}
          timer={timer}
        />
      )}
      {messageModal && <ToastMessage text={messageText} timer={timer} />}

      {showConfirmBox && (
        <ConfirmBox
          text={"레시피를 삭제하시겠습니까"}
          confirmButtonText={"삭제합니다."}
          onComfirmed={recipeDeleteConfirm}
          onDenied={recipeDeleteDenied}
        />
      )}
    </StWrap>
  );
};

export default RecipeDetail;

const StWrap = styled.div`
  height: 100%;
  overflow-y: scroll;

  .icon_box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 4px;
    margin-right: 10px;

    background-color: #444;
    color: #fff;
  }
`;
