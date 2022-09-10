import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const CommentInput = () => {
  const { recipeId } = useParams();
  const [newcomments, setNewComments] = useState({
    content: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewComments({
      ...newcomments,
      [name]: value,
      recipeId: parseInt(recipeId),
    });
  };
  //   console.log(newcomments);
  return (
    <StWrap>
      <div className="input_profile">
        <div className="profile_image"></div>
      </div>
      <div className="input_wrap fcc">
        <div className="input_box">
          <input
            className="comment_input"
            type="text"
            name="content"
            value={newcomments.content || ""}
            onChange={onChangeHandler}
            placeholder="댓글을 입력해주세요"
          />
          <button className="comment_btn">확인</button>
        </div>
        <div className="pic_wrap">
          <button className="pic_upload">+ 사진 업로드</button>
        </div>
      </div>
    </StWrap>
  );
};

export default CommentInput;

const StWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 80px;
  background-color: #ededed;

  .input_profile {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .profile_image {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-bottom: 1.5rem;

    border: 2px solid black;
  }

  .input_wrap {
    width: 100%;
    display: flex;
    flex-flow: column;
  }

  .input_box {
    width: 90%;
    height: 40%;
    border: 1px solid #8f8b8b8a;
    border-radius: 20px;
  }

  .comment_input {
    width: 90%;
    height: 100%;
    background-color: #ededed;
    border: none;
    border-radius: 20px;

    padding-left: 10px;
  }

  .comment_btn {
    width: 10%;
    height: 40%;
    border: none;
    border-radius: 20px;
  }

  .pic_wrap {
    width: 85%;
    display: flex;
    align-items: flex-start;
    margin-top: 0.2rem;
    border: none;
  }

  .pic_upload {
    border: none;
    color: #4690f7;
  }
`;
