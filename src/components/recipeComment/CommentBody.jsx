import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import talk_edit from "../../assets/svg/talk_edit.svg";
import CommentOption from "./CommentOption";
import api from "../../server/api";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import CommentInput from "./CommentInput";

const CommentBody = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const menubackground = useRef();

  const { recipeId } = useParams();
  let [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState();

  const token = localStorage.getItem("refreshToken");
  const { decodedToken, isExpired } = useJwt(token);

  // console.log(decodedToken);
  // console.log(comments);

  const getComments = async () => {
    let contentType = "application/json";
    const data = await api(contentType)
      .get(`/comments?recipeId=${recipeId}&page=1&count=10`)
      .then((res) => {
        console.log(res);
        setComments([...res.data.commentList]);
      });
  };

  const getTimegap = (createdAt) => {
    const myDate = new Date(createdAt);
    const result = myDate.getTime();
    const msdiff = Date.now() - result;
    const seconds = msdiff / 1000;

    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
    // const minute = Math.floor(msdiff / 60000);
    // const hour = Math.floor(msdiff / 360000);

    // if (msdiff < 0) {
    //   return <p>0분전</p>;
    // }
    // if (minute > 60) {
    //   return <p>{hour}시간 전</p>;
    // } else {
    //   return <p>{minute}분 전</p>;
    // }
  };
  const onErrorImg = (e) => {
    if (e.target.src === undefined) {
      setTimeout(() => {
        getComments();
      }, 2950);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    getComments();
    // }, 2900);
  }, []);

  return (
    <>
      <StListWrap>
        {comments.map((comment, recipeId) => (
          <React.Fragment key={recipeId}>
            <StCommentWrap>
              <StProfile>
                <div className="profile_pic">
                  <StCommentProfile
                    // src={decodedToken.imageUrl}
                    src={comment.userImageUrl}
                    onError={(e) => (e.target.src = comment.userResizedUrl)}
                  ></StCommentProfile>
                </div>
              </StProfile>
              <StContent>
                <div className="content_top">
                  <div className="nickname">{comment.nickname}</div>
                  <div className="create_time">
                    {getTimegap(comment.createdAt)}
                  </div>
                </div>
                <div className="content_bottom">{comment.comment}</div>
                {/* {comment.imageUrl == null ? null : ( */}
                <div className="content_picContainer">
                  <img
                    className="content_pic"
                    src={comment.resizedUrl}
                    onError={(e) => (e.target.src = comment.imageUrl)}
                  />
                </div>
                {/* )} */}
              </StContent>
              <StOption
                onClick={() => {
                  setMenuOpen(true);
                  setEditCommentId(comment.commentId);
                }}
              >
                <img src={talk_edit} />
              </StOption>

              {/* {menuOpen == true ? (
                <ModalBack
                  ref={menubackground}
                  onClick={(e) => {
                    if (menubackground.current === e.target) {
                      setMenuOpen(false);
                    }
                    e.stopPropagation();
                  }}
                >
                  <CommentOption
                    comments={comments}
                    setComments={setComments}
                    editCommentId={editCommentId}
                    setMenuOpen={setMenuOpen}
                  />
                </ModalBack>
              ) : null} */}
            </StCommentWrap>
          </React.Fragment>
        ))}
        <CommentOption
          comments={comments}
          setComments={setComments}
          editCommentId={editCommentId}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
        />
      </StListWrap>
      <CommentInput getComments={getComments} />
    </>
  );
};

export default CommentBody;

// const ModalBack = styled.div`
//   position: fixed;
//   z-index: 1000;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.05);
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   padding-bottom: 2.5rem;
//   box-sizing: border-box;
// `;

const StCommentProfile = styled.div`
  object-fit: cover;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  background: #eee no-repeat url(${(props) => props.src}) center / cover;
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
  min-height: 10vh;

  border-bottom: 0.5px solid #8f8b8b8a;
  padding-top: 1rem;

  display: flex;
  flex-flow: row;
`;

const StProfile = styled.div`
  width: 15%;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;

  .profile_pic {
    max-width: 50px;
    max-height: 50px;

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

  .content_picContainer {
    max-width: 300px;
    max-height: 300px;
    margin-bottom: 15px;
  }

  .content_pic {
    max-width: 300px;
    max-height: 300px;
    object-fit: cover;
  }
`;

const StOption = styled.div`
  width: 10%;

  cursor: pointer;
`;
