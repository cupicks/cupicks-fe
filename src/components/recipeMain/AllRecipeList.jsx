import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import AllRecipeListContainer from "./AllRecipeListContainer";
import axios from "axios";

const AllRecipeList = ({ allRecipe, setAllRecipe }) => {
  // allRecipe = allRecipe.recipeList;
  // const setTarget = useRef(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  // const page = useRef(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    // triggerOnce: true,
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

  const getItems = useCallback(async () => {
    setLoading(true);
    // setItems((prevState) => [...prevState, ...allRecipe]);
    // await axios.get(`${serverUrl}/api/recipes?page=${page}&limit=6`).then((res) => {
    await axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=6`)
      .then((res) => {
        setItems((prevState) => [...prevState, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
      // page.current += 1;
    }
  }, [inView, loading]);

  // console.log(ref);
  // console.log(items);
  // console.log(inView);
  // console.log(page);
  console.log(items);
  return (
    <StAllListWrap>
      {items.map((allrecipes, index) => (
        <React.Fragment key={index}>
          {items.length - 1 == index ? (
            <div ref={ref}>
              <AllRecipeListContainer allrecipes={allrecipes} />
            </div>
          ) : (
            <div>
              <AllRecipeListContainer allrecipes={allrecipes} />
            </div>
          )}
        </React.Fragment>
      ))}
    </StAllListWrap>
  );
};

export default AllRecipeList;

const StAllListWrap = styled.div`
  width: 100%;
  /* height: 220px; */
  border-radius: 12px;

  /* margin: 0 auto; */
  margin-top: 30px;

  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
