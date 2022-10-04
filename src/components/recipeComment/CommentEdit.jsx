import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import api from "../../server/api";
import { useForm } from "react-hook-form";
import editIcon from "../../assets/svg/cancel_photo.svg";
import { useJwt } from "react-jwt";
import ToastMessage from "../elements/modal/ToastMessage";

const CommentEdit = ({
  edit,
  setEdit,
  editCommentId,
  comments,
  setComments,
  setMenuOpen,
  setCheckComment,
  userProps,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: {} });
  const { userLogin, userLoginId, userProfileImg } = userProps;

  const { recipeId } = useParams();
  //이미지 미리보기
  const image = watch("image");
  const comment = watch("comment");

  const [imagePreview, setImagePreview] = useState("");

  let currentComment;
  comments.map((comment) => {
    if (comment.commentId === editCommentId) {
      currentComment = comment.comment;
    }
  });

  React.useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      if (!file) return;
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  const cancelImage = () => {
    if (image && image.length > 0) {
      setImagePreview(URL.revokeObjectURL(image[0]));
      setValue("image", null);
    }
    // setImagePreview("");
  };

  const editbackground = useRef();
  // const [editcomments, setEditComments] = useState({
  //   content: "",
  // });

  // console.log(comment);

  const getComments = async () => {
    let contentType = "application/json";
    const data = await api(contentType)
      .get(`/comments?recipeId=${recipeId}&page=1&count=10`)
      .then((res) => {
        setComments([...res.data.commentList]);
      });
    console.log(data);
  };

  const updateSubmit = async (data) => {
    // const content = editcomments.comment;
    if (comment === "") {
      setCheckComment(true);
      setTimeout(() => {
        setCheckComment(false);
      }, 1000);
      return;
    }

    let contentType = "multi-part/form-data";
    const form = new FormData();
    form.append(
      "imageValue",
      getValues("image") === undefined ? null : getValues("image")[0],
    );
    await api(contentType)
      .put(`/comments/${editCommentId}?comment=${data.comment}`, form)
      .then((res) => {
        getComments();
      });
    setValue("comment", null);
    setEdit(false);
    setMenuOpen(false);
  };

  // const onChangeEditHandler = (e) => {
  //   const { name, value } = e.target;
  //   setEditComments({
  //     ...editcomments,
  //     [name]: value,
  //     recipeId: parseInt(recipeId),
  //   });
  // };
  // console.log(edit);

  // value={editcomments.content || ""}
  // onChange={onChangeEditHandler}

  return (
    <>
      {/* {comments.map((comment, commentId) => ( */}
      <StWrap onSubmit={handleSubmit(updateSubmit)}>
        <div className="input_profile">
          <div className="profile_image">
            {userLogin !== null && (
              <StInputProfile src={userProfileImg}></StInputProfile>
            )}
          </div>
        </div>
        <div className="input_wrap fcc">
          <div className="input_box">
            <input
              className="comment_input"
              type="text"
              name="content"
              maxLength={150}
              defaultValue={currentComment}
              {...register("comment")}
              placeholder="새로운 댓글을 입력해주세요"
            />

            <button className="comment_btn">확인</button>
          </div>
          {imagePreview ? (
            <div className="img_preview">
              <label htmlFor="picture">
                <StPicUpload src={imagePreview}></StPicUpload>
              </label>
              <DeletePreview
                src={editIcon}
                onClick={() => {
                  cancelImage();
                }}
              ></DeletePreview>
            </div>
          ) : null}
          <div className="pic_wrap">
            <input
              type="file"
              id="picture"
              {...register("image")}
              accept="image/png, image/jpg"
            ></input>
            <label htmlFor="picture" className="pic_upload">
              + 사진 업로드
            </label>
          </div>
        </div>
      </StWrap>
      {/* ))} */}
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

const StWrap = styled.form`
  width: 60rem;
  min-height: 10rem;

  padding: 1rem 2.4rem;

  display: flex;
  gap: 1rem;

  position: absolute;
  bottom: 0;

  background-color: #eeeeee;

  input[type="file"] {
    display: none;
  }

  label {
    position: relative;
  }

  .input_profile {
    transform: translateY(-0.2rem);
  }

  .profile_image {
    max-width: 4rem;
    max-height: 4rem;
    border-radius: 50%;
  }

  .input_wrap {
    flex: 1 1 auto;

    display: flex;
    flex-flow: column;
    gap: 0.7rem;
  }

  .input_box {
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;

    display: flex;

    border: 0.1rem solid #d9d9d9;
    border-radius: 2rem;
  }

  .comment_input {
    all: unset;
    flex: 1 1 auto;

    padding-left: 1.2rem;

    font-size: 1.3rem;

    color: #9f9f9f;
  }

  .comment_btn {
    all: unset;
    padding: 0 1.2rem;

    font-size: 1.3rem;
  }

  .img_preview {
    width: 100%;
    display: flex;
  }

  .pic_wrap {
    width: 100%;
    display: flex;
  }

  .pic_upload {
    flex: 1 1 auto;
    color: #3897f0;

    font-size: 1.3rem;
  }

  @media (max-width: 30rem) {
    flex-flow: column;
    align-items: center;
    .img_preview {
      justify-content: center;
      padding-left: 2.5rem;
    }
    .pic_wrap {
      text-align: center;
    }
  }
`;

const StInputProfile = styled.img`
  max-width: 4rem;
  max-height: 4rem;
  border-radius: 50%;
`;

const DeletePreview = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  position: relative;
  transform: translate(-1.1rem, -0.9rem);
`;

const StPicUpload = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  /* background: cover; */
  object-fit: cover;
  display: flex;
`;
