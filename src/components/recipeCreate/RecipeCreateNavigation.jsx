import { useRef, useState } from "react";

import Navigation from "../../partial/Navigation";
import NavButtonDone from "../elements/button/NavButtonDone";
import NavButtonGoMain from "../elements/button/NavButtonGoMain";
import NavButtonNextLevel from "../elements/button/NavButtonNextLevel";
import NavButtonNextSublevel from "../elements/button/NavButtonNextSublevel";
import NavButtonPrevLevel from "../elements/button/NavButtonPrevLevel";
import NavButtonPrevSublevel from "../elements/button/NavButtonPrevSublevel";

import ToastMessage from "../elements/modal/ToastMessage";
import ConfirmBox from "../elements/modal/ConfirmBox";

const RecipeCreateNavigation = (props) => {
  const {
    cupState,
    setCupState,
    stepState,
    setStepState,
    formProps,
    recipeCreated,
  } = props;
  const {
    ingredientDeleteMode,
    cupFull,
    currCupSize: cupSize,
    isIcedTag,
    currentIngredientDeleted,
  } = cupState;
  const { step, finalStep, subStep, finalSubStep } = stepState;
  const { watch, getValues, reset } = formProps;

  // const buttonDone = useRef();

  const [modalCupFullRequired, setModalCupFullRequired] = useState(false);
  const [needMoreIngredient, setNeedMoreIngredient] = useState(false);
  const [showComfirmBox, setShowComfirmBox] = useState(false);
  const [showCompleteRequireBox, setShowCompleteRequireBox] = useState(false);

  window.addEventListener("keydown", () => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });

  // State 초기화할 때 사용합니다.
  const initialCupState = {
    cupStyleHeight: 0,
    isIcedTag: null,
    isPublicTag: null,
    currCupSize: null,
    cupFull: false,
    cupZero: false,
    cupLeft: null,
    ingredientDeleteMode: false,
    currentIngredientDeleted: false,
    currIngredientList: [],
  };
  const initialStepState = {
    step: 0,
    subStep: 0,
  };

  /***********************************/
  /* 레시피 만들기 step 상태 관리 변수 */
  /***********************************/
  const step0 = step === 0;
  const step2 = step === 2;
  const stepEnd = step === finalStep;
  const subStep0 = subStep === 0;
  const subStepEnd = subStep === finalSubStep;

  /******************************/
  /* 재료 리스트 validation 관리  */
  /* undefined일 때 거르는 조건문 */
  /******************************/
  const newList = getValues("ingredientList");
  const newListExist = newList !== undefined;

  let nameRequired = false;
  let amountRequired = false;
  let colorRequired = true;

  if (newListExist) {
    // 이름이 존재, 필요 여부
    const ingredientNameExist =
      newList[newList.length - 1]?.ingredientName !== undefined;
    if (ingredientNameExist) {
      const ingredientName = newList[newList.length - 1]?.ingredientName;
      ingredientName === "" ? (nameRequired = true) : "";
    }

    // 재료량이 존재, 필요 여부
    const ingredientAmountExist =
      +newList[newList.length - 1]?.ingredientAmount === 0 ||
      +newList[newList.length - 1]?.ingredientAmount < 10;
    if (ingredientAmountExist) amountRequired = true;

    // 색깔 선택 필요 여부
    colorRequired = newList[newList.length - 1]?.ingredientColor === null;
  }

  /****************************************/
  /**** "레시피 텍스트 value 입력 확인"  ****/
  /****************************************/
  const newInput = watch();
  let recipeCompletedRequired = true;
  if (newInput.title?.length > 0 && newInput.content?.length > 0) {
    recipeCompletedRequired ? (recipeCompletedRequired = false) : "";
  } else {
    !recipeCompletedRequired ? (recipeCompletedRequired = true) : "";
  }

  /*********************************/
  /**** "재료 처음부터 추가하기"  ****/
  /** 재료 처음부터 만들기 Confirmed */
  const goFirstConfirmed = () => {
    setShowComfirmBox(false);
    setTimeout(() => {
      reset();
      setCupState(initialCupState);
      setStepState((prev) => ({ ...prev, ...initialStepState }));
    }, 1000);
  };

  /** 재료 처음부터 만들기 Denied */
  const goFirstDenied = () => {
    setTimeout(() => {
      setShowComfirmBox(false);
    }, 1000);
  };

  /*************************/
  /** 버튼 비활성화 config **/
  /*************************/
  const nextButtonDisableCaseObj = {
    cupSizeRequired: step0 && cupSize === null,
    cupTypeRequired: step === 1 && isIcedTag === null,
    subStep0: step2 && subStep0,
    subStep1NameRequired: subStep === 1 && nameRequired,
    subStep2AmountRequired: subStep === 2 && amountRequired,
    subStep3ColorRequired: subStep === 3 && colorRequired,
  };
  const prevButtonDisableCaseObj = {
    currentIngredientDeleted: step2 && currentIngredientDeleted,
  };

  let nextDisabled; // next 버튼 컴포넌트 disabled={} 속성에 넘길 값
  for (const x in nextButtonDisableCaseObj) {
    nextButtonDisableCaseObj[x] ? (nextDisabled = true) : "";
  }

  let prevDisabled; // prev 버튼 컴포넌트 disabled={} 속성에 넘길 값
  for (const x in prevButtonDisableCaseObj) {
    prevButtonDisableCaseObj[x] ? (prevDisabled = true) : "";
  }

  // cupNotFull: 버튼 css 비활성화처럼 스타일링
  let buttonDisableStyle = step === 2 && !(subStepEnd && cupFull);

  //*********************************//
  //***  Step 이동하는 함수: 총 4개 ***//
  //*********************************//

  /** 다음 step으로 이동 */
  const goNextStep = () => {
    step < finalStep + 1
      ? setStepState((prev) => ({ ...prev, step: prev.step + 1 }))
      : "";
  };
  /** 이전 step으로 이동 */
  const goPrevStep = () => {
    step > 0 && setStepState((prev) => ({ ...prev, step: prev.step - 1 }));
  };
  /** 다음 step으로 이동 */
  const goNextSubStep = () => {
    subStep < finalSubStep &&
      setStepState((prev) => ({ ...prev, subStep: prev.subStep + 1 }));
  };
  /** 이전 step으로 이동 */
  const goPrevSubStep = () => {
    subStep > 0 &&
      setStepState((prev) => ({ ...prev, subStep: prev.subStep - 1 }));
  };

  //*********************************//
  //***  버튼 클릭 핸들러: 총 4개   ***//
  //*********************************//

  /** 이전 step 버튼 클릭 핸들러*/
  const stepButtonPrevClickHandler = () => {
    switch (step) {
      case 2:
        setShowComfirmBox(true);
        return null;
      default:
        "";
    }
    goPrevStep();
  };

  /** 다음 step 버튼 클릭 핸들러 */
  const stepButtonNextClickHandler = () => {
    switch (step) {
      case 2:
        if (!cupFull) {
          setModalCupFullRequired(true);
          setTimeout(() => {
            setModalCupFullRequired(false);
          }, 2000);
          return;
        }
        break;
      case 3:
        if (watch("title")?.length === 0 || watch("content").length === 0)
          return;
        setCupState({ ...cupState, subStep: 0 });
        return;
      default:
        "";
    }
    goNextStep();
  };

  /** 이전 subStep 버튼 클릭 핸들러 */
  const subStepButtonPrevClickHandler = () => {
    console.log(currentIngredientDeleted, subStep);
    switch (subStep) {
      case 1:
        setShowComfirmBox(true);
        return null;
      case 4:
        if (currentIngredientDeleted) {
          setNeedMoreIngredient(true);
          setTimeout(() => {
            setNeedMoreIngredient(false);
          }, 2000);
          return null;
        }
      default:
        "";
    }
    goPrevSubStep();
  };

  /** 다음 subStep 버튼 클릭 핸들러  */
  const subStepButtonNextClickHandler = () => {
    goNextSubStep();
  };

  /** 완료 Done 버튼 클릭 핸들러  */
  const doneButtonNextClickHandler = () => {
    if (recipeCompletedRequired) {
      setShowCompleteRequireBox(true);
      setTimeout(() => {
        setShowCompleteRequireBox(false);
      }, 2000);
    }
  };

  return (
    <Navigation empty={true}>
      {!ingredientDeleteMode && (
        <>
          {step0 && <NavButtonGoMain />}

          {!step0 && !(step2 && !subStep0) && (
            <NavButtonPrevLevel onClick={stepButtonPrevClickHandler} />
          )}

          {step2 && !subStep0 && (
            <NavButtonPrevSublevel
              disabledStyle={prevDisabled}
              onClick={subStepButtonPrevClickHandler}
            />
          )}

          {!stepEnd && !(step2 && !subStepEnd) && (
            <NavButtonNextLevel
              disabled={nextDisabled}
              onClick={stepButtonNextClickHandler}
              disabledStyle={buttonDisableStyle}
            />
          )}

          {step2 && !subStepEnd && (
            <NavButtonNextSublevel
              disabled={nextDisabled}
              onClick={subStepButtonNextClickHandler}
            />
          )}

          {stepEnd && (
            <NavButtonDone
              disabled={recipeCreated}
              disabledStyle={recipeCompletedRequired}
              onClick={doneButtonNextClickHandler}
            />
          )}

          <h4
            className="title"
            onClick={() => {
              setShowComfirmBox(true);
            }}
          >
            레시피 만들기
          </h4>

          {/* 모달 리스트 */}
          {modalCupFullRequired && (
            <ToastMessage
              text={"재료를 전부 채우지 않으면\n다음 단계로 넘어갈 수 없어요!"}
            />
          )}
          {showCompleteRequireBox && (
            <ToastMessage text={"레시피 내용을\n완성해주세요!"} />
          )}
          {needMoreIngredient && (
            <ToastMessage text={"새로운 재료를\n추가 해주세요!"} />
          )}
          {showComfirmBox && (
            <ConfirmBox
              text={
                "지금 이전 버튼을 누를 시\n전체량 선택부터 새로 하셔야 합니다."
              }
              confirmButtonText={"새로하기"}
              onComfirmed={goFirstConfirmed}
              onDenied={goFirstDenied}
            />
          )}
        </>
      )}
    </Navigation>
  );
};

export default RecipeCreateNavigation;
