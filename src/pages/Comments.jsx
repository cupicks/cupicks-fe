import React from "react";

import Navigation from "../partial/Navigation";
import CommentBody from "../components/recipeComment/CommentBody";

import styled from "styled-components";

const Comments = () => {

  return (
    <StRecipeComment>

      <Navigation 
        goto={-1}
      >
        <span className="title">댓글</span>
      </Navigation>

      <CommentBody />

    </StRecipeComment>
  );
};

export default Comments;

const StRecipeComment = styled.div`
  height: 100%;
  position: relative;
`;
