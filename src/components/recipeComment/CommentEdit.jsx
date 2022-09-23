import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import api from "../../server/api";
import { useForm } from "react-hook-form";
import editIcon from "../../assets/svg/cancel_photo.svg";
import { useJwt } from "react-jwt";

const CommentEdit = ({
  edit,
  setEdit,
  editCommentId,
  comments,
  setComments,
  setMenuOpen,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { recipeId } = useParams();
  //이미지 미리보기
  const image = watch("image");
  const comment = watch("comment");

  const [imagePreview, setImagePreview] = useState("");

  const token = localStorage.getItem("refreshToken");
  const { decodedToken, isExpired } = useJwt(token);

  React.useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      if (!file) return;
      setImagePreview(URL.createObjectURL(file));
    }
    console.log(image);
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
      return alert("댓글을 입력해주세요");
    }

    let contentType = "multi-part/form-data";
    const form = new FormData();
    form.append(
      "imageValue",
      getValues("image") === undefined ? null : getValues("image")[0]
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

  console.log(comments.comment)
  // console.log(comments);

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
    <StWrap  onSubmit={handleSubmit(updateSubmit)}>
      <div className="input_profile">
        <div className="profile_image">
          {decodedToken !== null && (
            <StInputProfile src={decodedToken.imageUrl}></StInputProfile>
          )}
        </div>
      </div>
      <div className="input_wrap fcc">
        <div className="input_box">
          <input
            className="comment_input"
            type="text"
            name="content"
            {...register("comment")}
            placeholder="새로운댓글을 입력해주세요"
          />
            {/* {comment.comment} */}
          
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
            accept="image/*"
            getValues={getValues}
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

const StInputProfile = styled.img`
  object-fit: cover;
  border-radius: 50%;
  max-width: 35px;
  max-height: 35px;
`;

const DeletePreview = styled.img`
  width: 15px;
  height: 15px;

  position: absolute;
  top: 34%;
  left: 35%;
`;

const StPicUpload = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  /* background: cover; */
  object-fit: cover;
  display: flex;
`;

const StWrap = styled.form`
  display: flex;
  flex: 1 1 auto;
  min-height: 80px;
  position: absolute;
  bottom: 0;
  background-color: #ededed;
  width: 100%;
  /* transform: translateY(45%); */

  input[type="file"] {
    display: none;
  }

  label {
    position: relative;
  }

  .img_preview {
    width: 90%;
    display: flex;
    align-items: flex-start;
  }

  .input_profile {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .profile_image {
    max-width: 40px;
    max-height: 40px;
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
    height: 3.8vh;
    border: 1px solid #8f8b8b8a;
    border-radius: 20px;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
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
    padding-bottom: 0.8rem;
  }
`;
