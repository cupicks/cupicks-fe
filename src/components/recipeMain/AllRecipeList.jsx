import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useInView } from "react-intersection-observer";

import AllRecipeListContainer from "./AllRecipeListContainer";

import api from "../../server/api";

import styled, { keyframes } from "styled-components";
import styledLayoutComponents from "../../styles/customLayoutStyle";
const { CustomFlexListWrap, CustomFlexList } = styledLayoutComponents;

import ToastMessage from "../elements/modal/ToastMessage";

const AllRecipeList = () => {
  // allRecipe = allRecipe.recipeList;
  // const setTarget = useRef(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [counting, setCounting] = useState(0);
  // const page = useRef(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.8,
  });
  //threshold

  // 1. scroll height 비교해서 쓰는방법이 하나 있고
  // 2. intersection observer api(debounce/throttle useEffect처럼-> setTimeout)
  // 3. react intersection observer(라이브러리) -> useInView(특정 부분 DOM), true/false
  // false, true로 바뀌면 setpage + 1

  // 처음에 12개 axios로 받을때, 그 외에 6개씩 axios로 받을때
  // if (page === 1) {
  //   axios.get(`localhost:3000/api/recipes?page=1&count=12`)
  // } else {
  //   axios.get(`localhost:3000/api/recipes?page=${}&count=6`)
  // }

  // const options = {
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 1,
  // };

  // useEffect(() => {
  //   if (!setTarget.current) return;
  //   const observer = new IntersectionObserver(callback, options);
  //   observer.observe(setTarget.current)
  //   return () => observer.disconnect();
  // }, [options, setTarget])

  // const callback = (entry) => {
  //   if (entry.isIntersecting && !loadFinished)
  // }

  // const getItems = useCallback(async () => {
  //   let contentType = "application/json";
  //   setLoading(true);
  //   await api(contentType)
  //     .get(`/recipes?page=${page}&count=12`)
  //     .then((res) => {
  //       setItems((prevState) => [...prevState, ...res.data.recipeList]);
  //     });
  //   setLoading(false);
  // }, [page]);

  //useCallback(함수, 배열) -> 첫번째 인자로 넘어온 함수를, 두번째 인자로 넘어온 배열 내의 값이 변경될때까지
  //저장해놓고 재사용할수 있게 해준다
  useEffect(() => {
    //마지막 요소를 보고 로딩중이 아니라면
    //page === 1 -> items.length == counting이 같아서 실행
    if (inView && !loading && items.length >= counting) {
      if (page === 1) {
        setPage(page + 1);
        setCounting(counting + 12);
      } else {
        setPage(page + 1);
        setCounting(counting + 6);
      }

      // page.current += 1;

      // 기존코드
      // if (inView && !loading) {
      //   setTimeout(() => {
      //     setPage(page + 1);
      //   }, 1500);
      // }
    }
  }, [inView, loading]);

  //서버에서 Item Get!

  const getItems = useCallback(async () => {
    let contentType = "application/json";
    setLoading(true);
    if (page === 1) {
      await api(contentType)
        .get(`/recipes?page=${page}&count=12`)
        .then((res) => {
          setItems([...res.data.recipeList]);
          // console.log(res);
        });
    } else {
      await api(contentType)
        .get(`/recipes?page=${page}&count=6`)
        .then((res) => {
          console.log(res);
          setItems([...items, ...res.data.recipeList]);
        });
    }
    setLoading(false);
  }, [page]);

  //getItems method가 바뀔때마다 함수실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  //-----하단 console.log 3개 주석처리할게요! -by선아
  // console.log(items);
  // console.log(page);
  // console.log(counting)
  // console.log(inView);

  // 로그인 여부를 확인하기 위해 로컬 스토리지의 토큰를 불러옵니다.
  const userLogin = Boolean(localStorage.getItem("refreshToken"));
  // 모달이 보여줍니다.
  const [needLogginModal, setNeedLogginModal] = useState(false);
  // 모달이 작동하는 시간입니다.
  const timer = 1000;
  const modalProps = {
    userLogin,
    needLogginModal,
    setNeedLogginModal,
    timer,
  };

  return (
    <StFlexListWrap>
      {items?.map((allrecipes, index) => (
        <CustomFlexList key={"allRecipeList" + index}>
          {items.length - 1 == index ? (
            <div className="flex_box" ref={ref}>
              {/* 스피너 이미지 비율이 깨지는 것 같습니다 -by선아 */}
              {/* {loading ? <Loading src={Logo} /> : null} */}
              <AllRecipeListContainer
                modalProps={modalProps}
                allrecipes={allrecipes}
                getItems={getItems}
                page={page}
              />
            </div>
          ) : (
            <div className="flex_box">
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

const fade = keyframes`
/* from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
} */
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// const Loading = styled.img`
//   width: 60px;
//   height: 60px;
//   animation: ${fade} 0.5s 0s forwards;
//   border: 1px solid rgba(255, 204, 204, 0.5);
//   border-radius: 50%;
//   padding: 10px;
//   margin: 10px;
//   overflow: hidden;
//   position: fixed;
//   left: 50%;
//   transform: translateX(-50%);
//   bottom: 100px;
// `;
