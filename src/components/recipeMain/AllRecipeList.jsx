import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import AllRecipeListContainer from "./AllRecipeListContainer";
import api from "../../server/api";
import styled from "styled-components";
import styledLayoutComponents from "../../styles/customLayoutStyle";
const { CustomFlexListWrap, CustomFlexList } = styledLayoutComponents;

import ConfirmBox from "../elements/modal/ConfirmBox";
import Ingredient from "./element/Ingredient";

const AllRecipeList = (props) => {
  const { loggedIn } = props;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [counting, setCounting] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView && !loading && items.length >= counting) {
      if (page === 1) {
        setPage(page + 1);
        setCounting(counting + 12);
      } else {
        setPage(page + 1);
        setCounting(counting + 6);
      }
    }
  }, [inView, loading]);

  const getItems = useCallback(async () => {
    let contentType = "application/json";
    setLoading(true);
    if (page === 1) {
      await api(contentType)
        .get(`/recipes?page=${page}&count=12`)
        .then((res) => {
          if (res.data.isSuccess) {
            setItems([...res.data.recipeList]);
          }
        });
    } else {
      await api(contentType)
        .get(`/recipes?page=${page}&count=6`)
        .then((res) => {
          if (res.data.isSuccess && page !== 2) {
            setItems([...items, ...res.data.recipeList]);
          }
        });
    }
    setLoading(false);
  }, [page, setItems]);

  //getItems method가 바뀔때마다 함수실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  // 모달을 보여주는 state.
  const [needLogginModal, setNeedLogginModal] = useState(false);
  // 모달이 작동하는 시간입니다.
  const gotoLogin = () => {
    navigate("/sign-in");
  };
  const cancelModal = () => {
    setNeedLogginModal(false);
  };
  const modalProps = {
    loggedIn,
    needLogginModal,
    setNeedLogginModal,
  };

  return (
    <StFlexListWrap>
      {items?.map((allrecipes, index) => (
        <CustomFlexList key={"allRecipeList" + index}>
          {items.length - 1 == index ? (
            <div className="flex_box" ref={ref} key={"allRecipeList" + index}>
              <AllRecipeListContainer
                modalProps={modalProps}
                allrecipes={allrecipes}
                getItems={getItems}
                page={page}
              />
            </div>
          ) : (
            <div className="flex_box" key={"allRecipeList" + index}>
              <AllRecipeListContainer
                modalProps={modalProps}
                allrecipes={allrecipes}
                getItems={getItems}
                page={page}
              />
            </div>
          )}
        </CustomFlexList>
      ))}

      {/* 토스트 메시지/모달 */}
      {needLogginModal && (
        <ConfirmBox
          text={"좋아요는 로그인이\n 필요한 기능입니다."}
          confirmButtonText={"로그인 하러 가기"}
          onComfirmed={gotoLogin}
          onDenied={cancelModal}
        />
      )}
    </StFlexListWrap>
  );
};

export default AllRecipeList;

const StFlexListWrap = styled(CustomFlexListWrap)`
  padding-bottom: 10vh;
`;
