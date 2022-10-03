import React from "react";

import styled from "styled-components";
import styledFormComponents from "../../styles/customFormStyle";
const { CustomTitle } = styledComponents;
import styledComponents from "../../styles/customElementStyle";
const { CustomButton, CustomErrorBox } = styledFormComponents;

import profile from "../../assets/svg/profile.svg";

const Image = (props) => {
  const { register, errors, watch, getValues } = props;
  const [imagePreview, setImagePreview] = React.useState("");

  const image = watch("image");

  React.useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
    if (image?.length === 0) {
      setImagePreview("");
    }
    console.log(image);
  }, [image]);

  return (
    <StDiv>
      <CustomTitle>
        <h1>프로필 이미지</h1>
      </CustomTitle>

      {imagePreview === "" ? (
        <StImg src={profile} alt="프로필 이미지" />
      ) : (
        <StImg src={imagePreview} />
      )}

      <input
        type="file"
        id="picture"
        {...register("image", { required: true })}
        accept="image/*"
        hidden="hidden"
      />

      {/* {errors.image && <p>이미지를 추가해 주세요</p>} */}
      <p className="info">이미지는 jpg, png 파일, 5mb 이하로 사용가능합니다.</p>
      <StButton>
        <label htmlFor="picture">사진 선택</label>
      </StButton>
    </StDiv>
  );
};

export default Image;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;

  input[type="file"] {
    display: none;
  }

  .info {
    color: #aaa;
    text-align: center;
    transform: translateY(-15px);
  }
`;

const StImg = styled.img`
  width: 130px;
  height: 130px;

  margin: 30px auto 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const StButton = styled(CustomButton)`
  height: 62px;

  line-height: 62px;
  position: relative;

  padding: 0;

  label {
    width: 100%;

    display: block;
    position: absolute;
    top: 0;

    cursor: pointer;

    :hover {
      color: #fff !important;
    }
  }
`;
