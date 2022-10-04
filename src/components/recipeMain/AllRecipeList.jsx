import React, { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import AllRecipeListContainer from "./AllRecipeListContainer";
import api from "../../server/api";
import styled from "styled-components";
import styledLayoutComponents from "../../styles/customLayoutStyle";
const { CustomFlexListWrap, CustomFlexList } = styledLayoutComponents;

import ToastMessage from "../elements/modal/ToastMessage";

const AllRecipeList = (props) => {
  const { loggedIn } = props;
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
          setItems([...res.data.recipeList]);
        });
    } else {
      await api(contentType)
        .get(`/recipes?page=${page + 1}&count=6`)
        .then((res) => {
          console.log(res);
          setItems([...items, ...res.data.recipeList]);
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
  const timer = 1000;
  const modalProps = {
    loggedIn,
    needLogginModal,
    setNeedLogginModal,
    timer,
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
        <ToastMessage text={"좋아요는 로그인이\n 필요한 기능입니다."} />
      )}
    </StFlexListWrap>
  );
};

export default AllRecipeList;

const StFlexListWrap = styled(CustomFlexListWrap)`
  padding-bottom: 10vh;
`;
