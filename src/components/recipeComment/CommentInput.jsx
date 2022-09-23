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
      <div className="input_wrap fcc">
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

const StInputProfile = styled.div`
  width: 35px;
  height: 35px;
  background: #eee no-repeat url(${(props) => props.src}) center / cover;
  border-radius: 50%;
`;

const DeletePreview = styled.img`
  width: 25px;
  height: 25px;

  position: absolute;
  top: 25%;
  left: 36%;
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
  background-color: #ededed;
  position: absolute;
  width: 100%;
  bottom: 0;

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
    align-items: flex-start;
    margin-top: 5px;
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
