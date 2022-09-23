import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../server/api";
import { useJwt } from "react-jwt";
import editIcon from "../../assets/svg/cancel_photo.svg";

const CommentInput = ({ getComments }) => {
  const { recipeId } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("refreshToken");

  const { decodedToken, isExpired } = useJwt(token);
  // const myDecodedToken = decodeToken(accessToken);
  // console.log(decodedToken.imageUrl);
  // const onSubmit = (data) => console.log(data);
  // const imageupload = useRef();

  const [files, setFiles] = useState([]);
  // const [picshow, setPicShow] = useState(false);
  //이미지 미리보기
  const image = watch("image");
  const comment = watch("comment");

  const [imagePreview, setImagePreview] = useState("");

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

  // const cancelImage = (fileIndex) => {
  //   const dt = new DataTransfer();
  //   Array.from(FileList)
  //     .filter((file) => file !== fileIndex)
  //dt로하면 array형태인것을 다시 filelist객체로 만듬(하나의 객체로)
  //drag & drop할때는 fileList형태
  //multipart form data형식에는 file형태로 보내줘도 되는지 fileList형태로 보내줘도 되는지 알아봐야함
  //     .foreach((file) => {
  //       dt.items.add(file);
  //       setFiles(dt.files);

  //       setImagePreview(imagePreview.filter((i) => i !== fileIndex));
  //     });
  // };

  // const picshowhandlr = () => {
  //   setPicShow(true);
  // }
  // React.useEffect(() => {
  //   cancelImage();
  // }, []);

  // const [comments, setComments] = useState({
  //   content: "",
  // });
  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setComments({
  //     ...comments,
  //     [name]: value,
  //     recipeId: parseInt(recipeId),
  //   });
  // };

  const fileSubmit = async (data) => {
    if (comment === "") {
      return alert("댓글을 입력해주세요");
    }
    let contentType = "multi-part/form-data";
    const form = new FormData();
    form.append(
      "imageValue",
      getValues("image") === undefined ? null : getValues("image")?.[0]
    );

    await api(contentType)
      .post(`/comments?recipeId=${recipeId}&comment=${data.comment}`, form)
      .then((res) => {
        console.log(res);
      });
    setImagePreview(URL.revokeObjectURL(image?.[0]));
    setValue("image", null);
    setValue("comment", null);
    getComments();
  };

  return (
    <StWrap onSubmit={handleSubmit(fileSubmit)}>
      <div className="input_profile">
        <div className="profile_image">
          {decodedToken !== null && (
            <StInputProfile src={decodedToken.imageUrl}></StInputProfile>
          )}
        </div>
      </div>
      <div className="input_wrap">
        <div className="input_box">
          <input
            className="comment_input"
            type="text"
            name="content"
            // value={comments.content || ""}
            // onChange={onChangeHandler}
            {...register("comment")}
            placeholder="댓글을 입력해주세요"
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
            accept="image/*"
            getValues={getValues}
          />
          <label htmlFor="picture" className="pic_upload">
            + 사진 업로드
          </label>
        </div>
      </div>
    </StWrap>
  );
};

export default CommentInput;

const StWrap = styled.form`
  width: 100%;
  min-height: 88px;

  padding: 10px 24px;

  display: flex;
  gap: 10px;

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
    transform: translateY(-2px);
  }

  .profile_image {
    max-width: 40px;
    max-height: 40px;
    border-radius: 50%;
  }

  .input_wrap {
    flex: 1 1 auto;

    display: flex;
    flex-flow: column;
    gap: 7px;
  }

  .input_box {
    height: 35px;
    line-height: 35px;

    display: flex;

    border: 1px solid #d9d9d9;
    border-radius: 20px;
  }

  .comment_input {
    all: unset;
    flex: 1 1 auto;

    padding-left: 12px;

    font-size: 13px;

    color: #9f9f9f;
  }

  .comment_btn {
    all: unset;
    padding: 0 12px;

    font-size: 13px;
  }

  .img_preview {
    width: 100%;
    display: flex;
  }

  .pic_wrap {
    display: flex;
  }

  .pic_upload {
    flex: 1 1 auto;
    color: #3897f0;

    font-size: 13px;
  }

  @media (max-width: 300px) {
    flex-flow: column;
    align-items: center;
    .img_preview {
      justify-content: center;
      padding-left: 25px;
    }
    .pic_wrap {
      text-align: center;
    }
  }
`;

const StInputProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  box-shadow: 0 0 0 1px #b6b6b6;
  background: #eee no-repeat url(${(props) => props.src}) center / cover;
`;

const DeletePreview = styled.img`
  width: 25px;
  height: 25px;

  position: relative;
  transform: translate(-11px, -9px);
`;

const StPicUpload = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  /* background: cover; */
  object-fit: cover;
  display: flex;
`;
