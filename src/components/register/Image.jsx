import React from "react";

import styled from "styled-components";
import styledFormComponents from "../../styles/customFormStyle";
const { CustomTitle } = styledComponents;
import styledComponents from "../../styles/customElementStyle";
const { CustomButton } = styledFormComponents;

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
    transform: translateY(-1.5rem);
  }
`;

const StImg = styled.img`
  width: 13rem;
  height: 13rem;

  margin: 3rem auto 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

const StButton = styled(CustomButton)`
  height: 5rem;
  line-height: 5rem;

  position: relative;
  transform: translateY(0.5rem);

  padding: 0;

  label {
    width: 100%;

    display: block;
    position: absolute;
    top: 0;

    font-size: 1.8rem;

    cursor: pointer;

    :hover {
      color: #fff !important;
    }
  }
`;
