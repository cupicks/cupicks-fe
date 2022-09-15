import { useRef, useState } from "react";
import styled from "styled-components";
import buttonIcon from "../../../assets/svg/cancel_modal.svg";

const ConfirmBox = (props) => {
  const {
    text = "",
    imageUrl = "",
    confirmButtonText = "",
    backgroundShadow = false,
    timer = 600,
    onComfirmed,
    onDenied,
  } = props;
  const [modalShow, setModalShow] = useState(true);
  const modalContents = useRef();

  const backgroundColor = backgroundShadow ? "rgba(0, 0, 0, 0.3)" : "";

  return (
    <>
      {modalShow && (
        <StModal timer={timer * 0.001}>
          <StBackground
            backgroundColor={backgroundColor}
            onMouseDown={onDenied}
            onClick={() => {
              modalContents.current.className = "contents fade_out";
              setTimeout(() => {
                setModalShow(false);
              }, timer / 3);
            }}
          />

          <div className="contents" ref={modalContents}>
            <img
              className="button_close"
              src={buttonIcon}
              alt="닫기 버튼"
              onClick={onDenied}
            />

            {imageUrl && (
              <img
                className="illust"
                src={imageUrl}
                alt="일러스트레이션 이미지"
              />
            )}

            {text}

            <button type="button" onClick={onComfirmed}>
              {confirmButtonText}
            </button>
          </div>
        </StModal>
      )}
    </>
  );
};

export default ConfirmBox;

const StBackground = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  background-color: ${(props) => props.backgroundColor};
`;

const StModal = styled.div`
  width: 100vw;
  height: 100vh;

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

  .contents {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 20px;

    width: 90%;
    max-width: 350px;
    border-radius: 15px;

    padding: 35px 0 22px;

    position: relative;
    transform: translateY(-60%);

    background-color: #fff;
    color: #393939;
    border: 1px solid #393939;
    box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.25);

    font-size: 18px;
    font-weight: 700;

    box-sizing: initial;
    white-space: pre-wrap;
  }

  .fade_out {
    opacity: 0;
    transition: opacity ${(props) => props.timer}s;
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
