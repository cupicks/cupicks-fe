import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import talk_edit from "../../assets/svg/talk_edit.svg";
import CommentOption from "./CommentOption";
import api from "../../server/api";
import { Navigate, useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import CommentInput from "./CommentInput";
import ToastMessage from "../elements/modal/ToastMessage";
import { useInView } from "react-intersection-observer";

const CommentBody = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const menubackground = useRef();

  const { recipeId } = useParams();
  let [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [counting, setCounting] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.8,
    // skip: true,
  });

  const [editCommentId, setEditCommentId] = useState();
  const [checkComment, setCheckComment] = useState(false);
  const [newComments, setNewComments] = useState(undefined);

  const token = localStorage.getItem("refreshToken");
  const { decodedToken, isExpired } = useJwt(token);

  /****************************/
  /******* 비로그인 기능 *******/
  /****************************/
  const [guestLoginShadow, setGuestLoginShadow] = useState(false);
  const [needLogginModal, setNeedLogginModal] = useState(false);

  const userLogin = Boolean(token);
  /****************************/
  /******** 로그인 기능 ********/
  /****************************/
  const userLoginId = decodedToken?.userId;
  const userProfileImg = decodedToken?.imageUrl;
  const userProps = { userLogin, userLoginId, userProfileImg };
  let commentAuthor;
  /****************************/

  useEffect(() => {
    if (inView && !loading && comments.length >= counting) {
      setPage(page + 1);
      setCounting(counting + 6);
    }
  }, [inView, loading]);

  const getComments = useCallback(async () => {
    let contentType = "application/json";
    setLoading(true);
    const data = await api(contentType)
      .get(`/comments?recipeId=${recipeId}&page=${page}&count=10`)
      .then((res) => {
        // console.log(res);
        setComments([...comments, ...res.data.commentList]);
      });
    setLoading(false);
  }, [page]);

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
  };

  // const onErrorImg = (e) => {
  //   if (e.target.src === undefined) {
  //     setTimeout(() => {
  //       getComments();
  //     }, 2950);
  //   }
  // };

  useEffect(() => {
    // setTimeout(() => {
    getComments();
    setNewComments([]);

    // }, 2900);

    /******* 비로그인 기능 *******/
    if (!userLogin) {
      setGuestLoginShadow(true);
    }
    console.log("hi");
  }, [getComments]);

  return (
    <>
      <StListWrap>
        {newComments?.length !== 0 &&
          newComments?.map((newComment, i) => {
            return (
              <StCommentWrap key={"newComment" + i}>
                <div className="flex_box">
                  <StProfile>
                    <StCommentProfile
                      src={newComment.userImageUrl}
                      onError={(e) =>
                        (e.target.src = newComment.userResizedUrl)
                      }
                    />
                  </StProfile>
                  <StContent>
                    <div className="content_top">
                      <span className="nickname">{newComment.nickname}</span>
                      <span className="dot">•</span>
                      <span className="create_time">
                        {getTimegap(newComment.createdAt)}
                      </span>
                    </div>
                    <div className="content_bottom">{newComment.comment}</div>
                    {/* {comment.imageUrl == null ? null : ( */}
                    <div className="content_picContainer">
                      {/* 기존 img태그 => div로 변경했습니다(크기 동일하게 하기 위해서) */}
                      <img
                        className="content_pic"
                        src={newComment.imageUrl}
                        onError={(e) => (e.target.src = newComment.resizedUrl)}
                      />
                    </div>
                    {/* )} */}
                  </StContent>
                  <StOption
                    onClick={() => {
                      if (userLogin) {
                        // 기존 코드
                        setMenuOpen(true);
                        setEditCommentId(newComment.commentId);
                      } else {
                        // 비로그인 기능 추가
                        if (!needLogginModal) {
                          setNeedLogginModal(true);
                          setTimeout(() => {
                            setNeedLogginModal(false);
                          }, 2000);
                        }
                      }
                    }}
                  >
                    <img src={talk_edit} />
                  </StOption>
                </div>
              </StCommentWrap>
            );
          })}

        {comments?.map((comment, recipeId) => {
          // 댓글을 작성한 본인인지 확인합니다.
          commentAuthor = userLoginId === comment.userId;
          return (
            <StCommentWrap key={recipeId}>
              {comments.length - 1 == recipeId ? (
                <div className="flex_box" ref={ref}>
                  <StProfile>
                    <StCommentProfile
                      // src={decodedToken.imageUrl}
                      src={comment.userImageUrl}
                      onError={(e) => (e.target.src = comment.userResizedUrl)}
                    />
                  </StProfile>
                  <StContent>
                    <div className="content_top">
                      <span className="nickname">{comment.nickname}</span>
                      <span className="dot">•</span>
                      <span className="create_time">
                        {getTimegap(comment.createdAt)}
                      </span>
                    </div>
                    <div className="content_bottom">{comment.comment}</div>
                    {/* {comment.imageUrl == null ? null : ( */}
                    <div className="content_picContainer">
                      {/* 기존 img태그 => div로 변경했습니다(크기 동일하게 하기 위해서) */}
                      <img
                        className="content_pic"
                        src={comment.imageUrl}
                        onError={(e) => (e.target.src = comment.resizedUrl)}
                      />
                    </div>
                    {/* )} */}
                  </StContent>
                  <StOption>
                    <button
                      disabled={!commentAuthor}
                      onClick={() => {
                        if (userLogin) {
                          // 기존 코드
                          setMenuOpen(true);
                          setEditCommentId(comment.commentId);
                        } else {
                          // 비로그인 기능 추가
                          if (!needLogginModal) {
                            setNeedLogginModal(true);
                            setTimeout(() => {
                              setNeedLogginModal(false);
                            }, 2000);
                          }
                        }
                      }}
                    >
                      {commentAuthor && <img src={talk_edit} />}
                    </button>
                  </StOption>
                </div>
              ) : (
                <div className="flex_box">
                  <StProfile>
                    <StCommentProfile
                      // src={decodedToken.imageUrl}
                      src={comment.userImageUrl}
                      onError={(e) => (e.target.src = comment.userResizedUrl)}
                    />
                  </StProfile>
                  <StContent>
                    <div className="content_top">
                      <span className="nickname">{comment.nickname}</span>
                      <span className="dot">•</span>
                      <span className="create_time">
                        {getTimegap(comment.createdAt)}
                      </span>
                    </div>
                    <div className="content_bottom">{comment.comment}</div>
                    {/* {comment.imageUrl == null ? null : ( */}
                    <div className="content_picContainer">
                      {/* 기존 img태그 => div로 변경했습니다(크기 동일하게 하기 위해서) */}
                      <img
                        className="content_pic"
                        src={comment.imageUrl}
                        onError={(e) => (e.target.src = comment.resizedUrl)}
                      />
                    </div>
                    {/* )} */}
                  </StContent>
                  <StOption>
                    <button
                      disabled={!commentAuthor}
                      onClick={() => {
                        if (userLogin) {
                          // 기존 코드
                          setMenuOpen(true);
                          setEditCommentId(comment.commentId);
                        } else {
                          // 비로그인 기능 추가
                          if (!needLogginModal) {
                            setNeedLogginModal(true);
                            setTimeout(() => {
                              setNeedLogginModal(false);
                            }, 2000);
                          }
                        }
                      }}
                    >
                      {commentAuthor && <img src={talk_edit} />}
                    </button>
                  </StOption>
                </div>
              )}
            </StCommentWrap>
          );
        })}

        <CommentOption
          comments={comments}
          setComments={setComments}
          editCommentId={editCommentId}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          setCheckComment={setCheckComment}
          userProps={userProps}
        />
      </StListWrap>
      <CommentInput
        getComments={getComments}
        setCheckComment={setCheckComment}
        setComments={setComments}
        comments={comments}
        setNewComments={setNewComments}
      />

      {/* 댓글 작성 가리기 */}
      {guestLoginShadow && <StGuestLoginShadow />}

      {/* 토스트 메시지/모달 */}
      {needLogginModal && (
        <ToastMessage text={"로그인이\n 필요한 기능입니다."} />
      )}
      {checkComment && (
        <ToastMessage text={"댓글을 입력해주세요"} timer={1000} />
      )}
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

const StProfile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const StCommentProfile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  box-shadow: 0 0 0 1px #b6b6b6;
  background: #eee no-repeat url(${(props) => props.src}) center / cover;
`;

const StListWrap = styled.div`
  height: calc(100vh - 60px - 80px);
  overflow-y: scroll;

  padding-bottom: 50px;
`;

const StCommentWrap = styled.div`
  min-height: 80px;
  padding: 20px 25px 15px;

  display: flex;
  gap: 15px;

  border-top: 1px solid #eeeeee;

  :last-child {
    border-bottom: 1px solid #eeeeee;
  }

  & > .flex_box {
    height: 100%;
    flex: 1 1 auto;
    gap: 10px;
    display: flex;
    flex-flow: row;
  }
`;

const StContent = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-flow: column;
  gap: 3px;

  font-size: 14px;

  color: #393939;

  .content_top {
    display: flex;
    gap: 7px;
  }

  .nickname {
    font-weight: 700;
  }

  .dot {
    font-size: 12px;
    transform: translateY(1px);
  }

  .dot,
  .create_time {
    color: #9f9f9f;
  }

  .content_bottom {
    padding-bottom: 10px;
  }

  .content_picContainer {
    max-width: 100%;

    display: flex;
    overflow: hidden;
  }

  .content_pic {
    width: 100%;
    max-height: 30vh;
    object-fit: cover;
  }
`;

const StOption = styled.div`
  padding: 0 10px;
  transform: translateX(10px);
  button {
    cursor: pointer;
  }
  button:disabled {
    pointer-events: none;
  }
`;

// 비로그인 댓글 작성 막는 div
const StGuestLoginShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(233, 233, 233, 0.7);

  ::after {
    content: "로그인 후 이용할 수 있습니다.";
    width: 100%;
    height: 100%;
    padding-top: 20px;

    color: #555;
    font-weight: 600;

    display: flex;
    justify-content: center;
  }
`;
