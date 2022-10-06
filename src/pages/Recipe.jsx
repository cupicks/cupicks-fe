import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapNoHeader } = styledLayoutComponents;

import RecipeBody from "../components/recipeMain/RecipeBody";
import UserGuide from "../components/userGuide/UserGuide";
import { useRef } from "react";

import { gotoScrollTop as gotoScrollTop } from "../util/goToScrollTop";

import topButton from "../assets/svg/top_button.svg";

const Recipe = (props) => {
  const { loggedIn } = props;
  const scrollTopLookAround = useRef();
  const scrollElement = useRef();

  return (
    <>
      <StWrapBody ref={scrollElement}>
        <UserGuide
          loggedIn={loggedIn}
          scrollTopLookAround={scrollTopLookAround}
          scrollElement={scrollElement}
        />
        <div ref={scrollTopLookAround} />

        <RecipeBody loggedIn={loggedIn} />
      </StWrapBody>

      <StTopButton
        className="top_button"
        onClick={() => gotoScrollTop(scrollElement)}
      >
        <img src={topButton} alt="맨 위로 가기" />
      </StTopButton>
    </>
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

const StTopButton = styled.button`
  position: absolute;
  bottom: 10rem;
  right: 1.1rem;

  padding: 0.5rem;

  opacity: 0.8;
  transition: all 0.2s;

  :hover {
    opacity: 1;
    transform: translateY(-0.5rem);
  }

  img {
    width: 3.6rem;
  }
`;
