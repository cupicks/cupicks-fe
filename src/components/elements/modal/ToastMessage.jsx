import { useState } from "react";
import styled from "styled-components";

const ToastMessage = (props) => {
  const {
    text = "",
    imageUrl = "",
    timer = 2000,
    backgroundShadow = false,
    smallFont = false,
  } = props;
  const [modalShow, setModalShow] = useState(true);

  const backgroundColor = backgroundShadow ? "rgba(0, 0, 0, 0.3)" : "";
  const fontSize = smallFont ? "1.4rem" : "1.8rem";

  setTimeout(() => {
    setModalShow(false);
  }, timer);

  return (
    <>
      {modalShow && (
        <StModal
          fontSize={fontSize}
          backgroundColor={backgroundColor}
          timer={timer * 0.001}
          onClick={() => {
            setModalShow(false);
          }}
        >
          <div className="contents">
            {imageUrl && (
              <img
                className="illust"
                src={imageUrl}
                alt="일러스트레이션 이미지"
              />
            )}

            {text}
          </div>
        </StModal>
      )}
    </>
  );
};

export default ToastMessage;

const StModal = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 0 10px;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;

  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  text-align: center;
  word-wrap: break-word;

  background-color: ${(props) => props.backgroundColor};
  animation: fadeInOut ${(props) => props.timer}s forwards;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .contents {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 20px;

    width: 90%;
    max-width: 350px;
    border-radius: 15px;

    padding: 35px 0;

    position: relative;
    transform: translateY(-150px);

    background-color: #fff;
    color: #393939;
    border: 1px solid #393939;
    box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.25);

    font-size: ${(props) => props.fontSize};
    font-weight: 700;

    box-sizing: initial;
    white-space: pre-wrap;
  }

  .button_close {
    position: absolute;
    top: 11px;
    right: 15px;

    cursor: pointer;
  }

  button {
    all: unset;
    padding: 8px 60px;

    background: #101010;
    color: #fff;
    border-radius: 10px;

    cursor: pointer;
  }

  img.illust {
    width: 80%;
  }
`;
