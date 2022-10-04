import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapNoHeader } = styledLayoutComponents;

import RecipeBody from "../components/recipeMain/RecipeBody";
import UserGuide from "../components/userGuide/UserGuide";
import { useRef } from "react";

const Recipe = (props) => {
  const { loggedIn } = props;
  const scrollTopLookAround = useRef();
  const scrollElement = useRef();

  return (
    <StWrapBody ref={scrollElement}>
      <UserGuide
        loggedIn={loggedIn}
        scrollTopLookAround={scrollTopLookAround}
        scrollElement={scrollElement}
      />
      <div ref={scrollTopLookAround} />

      <RecipeBody loggedIn={loggedIn} />
    </StWrapBody>
  );
};

export default Recipe;

const StWrapBody = styled(CustomWrapNoHeader)`
  .error {
    width: 100%;
    text-align: center;
    img {
      width: 50%;
    }
  }

  overflow: auto;
`;
