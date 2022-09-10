import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import talk_edit from "../../assets/svg/talk_edit.svg";
import CommentOption from "./CommentOption";
import axios from "axios";

const CommentBody = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menubackground = useRef();
  // const [comment, setComment] = useState([]);
  // const fetchComment = async () => {
  //   const data = await axios.get(`url/api/comments`).then((res) => {
  //     console.log(res)
  //   });
  //   setComment(data.data.commentList);
  // }

  // useEffect(() => {
  //   fetchComment();
  // }, []);
  const start = {
    isSuccess: true,
    message: "댓글 전체 조회에 성공했습니다.",
    commentList: [
      {
        userId: 1,
        nickname: "이민석",
        recipeId: 1,
        commentId: 1,
        imageUrl: "",
        recizedUrl: "",
        comment: "이 레시피 너무 좋은데요?",
        createdAt: "30분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
      {
        userId: 2,
        nickname: "두선아",
        recipeId: 1,
        commentId: 2,
        imageUrl: "",
        recizedUrl: "",
        comment: "ㅇㅈㅇㅈ",
        createdAt: "25분전", // Date 양식
        updatedAt: "5분전", // Date 양식
      },
    ],
  };
  let [comments, setComments] = useState(start);
  comments = comments.commentList;

  console.log(menubackground);
  return (
    <StListWrap>
      {comments.map((comment, recipeId) => (
        <React.Fragment key={recipeId}>
          <StCommentWrap>
            <StProfile>
              <div className="profile_pic"></div>
            </StProfile>
            <StContent>
              <div className="content_top">
                <div className="nickname">{comment.nickname}</div>
                <div className="create_time">{comment.createdAt}</div>
              </div>
              <div className="content_bottom">{comment.comment}</div>
            </StContent>
            <StOption
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <img src={talk_edit} />
            </StOption>
            {menuOpen == true ? (
              <ModalBack
                ref={menubackground}
                onClick={(e) => {
                  if (menubackground.current === e.target) {
                    setMenuOpen(false);
                  }
                  e.stopPropagation();
                }}
              >
                <CommentOption setMenuOpen={setMenuOpen} />
              </ModalBack>
            ) : null}
          </StCommentWrap>
        </React.Fragment>
      ))}
    </StListWrap>
  );
};

export default CommentBody;

const ModalBack = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2.5rem;
  box-sizing: border-box;
`;

const StListWrap = styled.div`
  height: calc(100vh - 60px - 80px);
  /* display: flex; */
  flex-flow: column;
  border-bottom: 2px solid #e6e6e6;
  border-top: 0.5px solid #8f8b8b8a;
  position: relative;
  overflow-y: scroll;
  padding-bottom: 50px;
`;
const StCommentWrap = styled.div`
  width: 100%;
  height: 10vh;

  border-bottom: 0.5px solid #8f8b8b8a;
  padding-top: 1rem;

  display: flex;
  flex-flow: row;
`;

const StProfile = styled.div`
  width: 15%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  .profile_pic {
    width: 5vh;
    height: 5vh;

    margin-bottom: 2.2rem;

    border: 1px solid black;
    border-radius: 50%;
  }
`;

const StContent = styled.div`
  width: 75%;

  display: flex;
  flex-flow: column;

  .content_top {
    height: 35%;
    display: flex;
    flex-flow: row;
  }

  .content_bottom {
    height: 65%;
    font-size: 15px;
  }

  .nickname {
    width: 20%;
    font-size: 14px;
    font-weight: bold;

    display: flex;
    align-items: center;
  }

  .create_time {
    width: 80%;
    font-size: 13px;
    color: gray;

    display: flex;
    align-items: center;
  }
`;

const StOption = styled.div`
  width: 10%;

  cursor: pointer;
`;
