import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import commentPicSrc from "../../assets/svg/profile.svg";
import editIcon from "../../assets/svg/edit.svg";

const CommentInput = () => {
  const { recipeId } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [files, setFiles] = useState([]);
  //이미지 미리보기
  const image = watch("image");
  const [imagePreview, setImagePreview] = useState([]);
  console.log(imagePreview);
  React.useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      if (!file) return;
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  const cancelImage = (fileIndex) => {
    const dt = new DataTransfer();
    Array.from(FileList)
      .filter((file) => file !== fileIndex)
      .foreach((file) => {
        dt.items.add(file);
        setFiles(dt.files);

        setImagePreview(imagePreview.filter((i) => i !== fileIndex));
      });
  };

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

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (comments === "") {
  //     return alert("댓글을 입력해주세요");
  //   }
  //   await axios
  //     .post(
  //       `url/api/comments?recipeId=${recipeId}&comment=${comments}`,
  //       comments
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     });
  //   fetchComments();
  //   setComments("");
  // };
  // console.log(newcomments);
  return (
    <StWrap onSubmit={handleSubmit(onSubmit)}>
      <div className="input_profile">
        <div className="profile_image"></div>
      </div>
      <div className="input_wrap fcc">
        <div className="input_box">
          <input
            className="comment_input"
            type="text"
            name="content"
            // value={comments.content || ""}
            // onChange={onChangeHandler}
            placeholder="댓글을 입력해주세요"
          />
          <button className="comment_btn">확인</button>
        </div>
        {imagePreview.map((image, i) => {
          return (
            <div className="img_preview" key={i}>
              <label htmlFor="picture">
                <StPicUpload src={image}></StPicUpload>
                <DeletePreview
                  src={editIcon}
                  onClick={() => {
                    cancelImage(i);
                  }}
                ></DeletePreview>
              </label>
            </div>
          );
        })}
        <div className="pic_wrap">
          + 사진 업로드
          <input
            className="pic_upload"
            type="file"
            id="picture"
            {...register("image", { required: true })}
            accept="image/*"
          >
            {/* + 사진 업로드 */}
          </input>
        </div>
      </div>
    </StWrap>
  );
};

export default CommentInput;

const DeletePreview = styled.img`
  width: 15px;
  height: 15px;

  position: absolute;
  top: 0;
  right: 0;
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

  /* input[type="file"] {
    display: none;
  } */

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
    height: 4vh;
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
  }
`;
