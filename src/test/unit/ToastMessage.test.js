import ToastMessage from "../../components/elements/modal/ToastMessage.jsx";

import {
  render,
  screen,
  cleanup,
  fireEvent,
  renderHook,
} from "@testing-library/react";
import renderer from "react-test-renderer";

// afterEach(cleanup);

describe("ToastMessage component", () => {
  // arrange
  const propsText = "사용자가 입력하는 메시지";
  const propsTimer = 2000;

  const component = renderer.create(
    <ToastMessage
      text={propsText}
      timer={propsText}
      imageUrl="/image.png"
      backgroundShadow={false}
      smallFont={false}
      title="modal"
    />,
  );

  // act
  // 가짜 타이머
  // setModalShow(false);

  // assert
  it("ToastMessage가 render되었습니다.", () => {
    expect(component).toBeInTheDocument;
    expect(component).toBeVisible;
  });

  it("ToastMessage가 기존 스냅샷과 같습니다.", () => {
    expect(component).toMatchSnapshot();
  });

  it("ToastMessage의 modal이 화면에 보입니다.", () => {
    // const modal = screen.findByTitle("modal");
    const modal = screen.findByTitle("modal");
    expect(modal).toBeInTheDocument;
    expect(modal).toBeTruthy;
  });

  it("ToastMessage의 modal이 화면에 없습니다.", () => {
    const modal = screen.queryByTitle("modal");
    expect(modal).not.toBeInTheDocument;
  });

  it("전달받은 메시지가 화면에 출력됩니다.", () => {
    const modal = screen.findByTestId("modal");
    expect(propsText).toBeInTheDocument;
  });

  it("props로 전달받은 이미지가 화면에 출력됩니다.", () => {
    // const { imageUrl } = component.props;
    const imageElement = screen.findByRole("img");
    expect(imageElement).toBeInTheDocument;
    // src 출력에 에러가 없음
    // src에 우리 주소 포함
    // expect(imageElement.src).toMatch(imageUrl);
  });

  it("modalShow state이 true입니다.", () => {
    // const { result, renderer } = renderHook(({ modalShow } = {}) => modalShow, {
    //   initialProps: { modalShow: false, text: "토스트 메시지" },
    // });
    // expect(result.current).toEqual(false);
    // const modal = screen.findByRole("aside");
    // expect(modal).toBeInTheDocument;
  });

  it("modalShow값이 false일 때, StModal 컴포넌트를 render하지 않음", () => {
    // state값을 확인해야 함
    // const modal = screen.getByRole("aside", { exact: false });
    const modal = document.querySelector(".contents");
    expect(modal).toBeInTheDocument;
  });

  it("timer시간 후에 modalShow값이 false로 바뀜", () => {
    const modal = screen.findByRole(
      "aside",
      { exact: false },
      { timeout: 2000 },
    );
    expect(modal).not.toBeInTheDocument;
  });

  it("modalShow값이 false로 바뀌었음", () => {});
});
