import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommentEdit = ({ edit }) => {
  const { recipeId } = useParams();
  const editbackground = useRef();
  const [editcomments, setEditComments] = useState({
    content: "",
  });

  //   const onUpdateHandler = async () => {
  //     const content = editcomments.comment;
  //     await axios
  //       .put(`url/api/comments/${commentId}?comment=${content}`, {
  //         content,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //     setEdit(false);
  //   };

  const onChangeEditHandler = (e) => {
    const { name, value } = e.target;
    setEditComments({
      ...editcomments,
      [name]: value,
      recipeId: parseInt(recipeId),
    });
  };
  console.log(edit);

  return (
    <>
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
              value={editcomments.content || ""}
              onChange={onChangeEditHandler}
              placeholder="새로운댓글을 입력해주세요"
            />
            <button className="comment_btn">확인</button>
          </div>
          <div className="pic_wrap">
            <button className="pic_upload">+ 사진 업로드</button>
          </div>
        </div>
      </StWrap>
    </>
  );
};

export default CommentEdit;

// const EditBack = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   box-sizing: border-box;
// `;

const StWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 90px;
  background-color: #ededed;
  width: 100%;
  transform: translateY(45%);

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
    width: 85%;
    height: 100%;
    background-color: #ededed;
    border: none;
    border-radius: 20px;

    padding-left: 10px;

    font-size: 0.8rem;
  }

  .comment_btn {
    width: 15%;
    height: 40%;
    border: none;
    border-radius: 20px;

    font-size: 0.8rem;
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

    font-size: 0.8rem;
  }
`;
