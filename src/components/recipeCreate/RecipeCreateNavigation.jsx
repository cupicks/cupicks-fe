import { useState } from "react";

import Navigation from "../../partial/Navigation";
import NavButtonDone from "../elements/button/NavButtonDone";
import NavButtonGoBack from "../elements/button/NavButtonGoBack";
import NavButtonNextLevel from "../elements/button/NavButtonNextLevel";
import NavButtonNextSublevel from "../elements/button/NavButtonNextSublevel";
import NavButtonPrevLevel from "../elements/button/NavButtonPrevLevel";
import NavButtonPrevSublevel from "../elements/button/NavButtonPrevSublevel";

import ToastMessage from "../elements/modal/ToastMessage";
import ConfirmBox from "../elements/modal/ConfirmBox";

const RecipeCreateNavigation = (props) => {
	const { cupState, setCupState, stepState, setStepState, formProps, formArrayProps} = props;
  const { ingredientDeleteMode, cupFull, currCupSize:cupSize, isIcedTag} = cupState
  const { step, finalStep, subStep, finalSubStep } = stepState
  const { watch, getValues, reset, setError } = formProps

  const [modalCupFullRequired, setModalCupFullRequired] = useState(false)
  const [showComfirmBox, setShowComfirmBox] = useState(false)

  window.addEventListener('keydown', ()=>{
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  })

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
    currIngredientList: []
  }
  const initialStepState = {
    step: 0,
    subStep: 0
  }

  // 레시피 만들기 step 상태 관리 변수
  const step0 = step === 0;
  const step2 = step === 2;
  const stepEnd = step === finalStep;
  const subStep0 = subStep === 0;
  const subStepEnd = subStep === finalSubStep;

  // 재료 리스트 validation 상태 관리 변수
  const newList = getValues('ingredientList')
  const newListExist = newList !== undefined

  let nameRequired = false;
  let amountRequired = false;

  if(newListExist){
    const ingredientNameExist = newList[newList.length-1]?.ingredientName !== undefined
    const ingredientAmountExist = +newList[newList.length-1]?.ingredientAmount === 0 || +newList[newList.length-1]?.ingredientAmount < 10

    if(ingredientNameExist){
      const ingredientName = newList[newList.length-1]?.ingredientName
      ingredientName === '' ? nameRequired = true : '';
    }
    if(ingredientAmountExist) amountRequired = true
  }

  // 컨펌박스 Confirmed 또는 Denied
  const goFirstConfirmed = () => {
    setShowComfirmBox(false)
    setTimeout(()=>{
      reset()
      setCupState(initialCupState)
      setStepState(prev => ({...prev, ...initialStepState}))
    }, 100)
  }

  const goFirstDenied = () => {
    setShowComfirmBox(false)
  }

  // 버튼 비활성화
  const buttonDisableCaseObj = {
    cupSizeRequired: step0 && cupSize === null,
    cupTypeRequired: step === 1 && isIcedTag === null,
    subStep0: step2 && subStep0 ? true : '',
    subStep1NameRequired: subStep === 1 && nameRequired ? true : '',
    subStep2AmountRequired: subStep === 2 && amountRequired ? true : '',
  }
  
  let nextDisabled // 버튼 컴포넌트 disabled={} 속성에 넘길 값
  for (const x in buttonDisableCaseObj){
    buttonDisableCaseObj[x] ? nextDisabled = true : '';
  }
  // cupNotFull: 버튼 css 비활성화처럼 보이게하는 상태 
  let buttonDisableStyle = step === 2 && !(subStepEnd && cupFull)

  //*********************************//
  //***  Step 이동하는 함수: 총 4개 ***//
  //*********************************//

  /** 다음 step으로 이동 */
  const goNextStep = () => {
    step < finalStep + 1 ? setStepState(prev => ({...prev, step: prev.step + 1})) : '';
  }
  /** 이전 step으로 이동 */
  const goPrevStep = () => {
    step > 0 && setStepState(prev => ({...prev, step: prev.step - 1}));
  }
  /** 다음 step으로 이동 */
  const goNextSubStep = () => {
    subStep < finalSubStep &&  setStepState(prev => ({...prev, subStep: prev.subStep + 1}));
  }
  /** 이전 step으로 이동 */
  const goPrevSubStep = () => {
    subStep > 0 && setStepState(prev => ({...prev, subStep: prev.subStep - 1}));
  }

  //*********************************//
  //***  버튼 클릭 핸들러: 총 4개   ***//
  //*********************************//

  /** 이전 step 버튼 클릭 핸들러*/
  const stepButtonPrevClickHandler = () => {
    switch (step) {
      case 2:
        setShowComfirmBox(true)
        return null;
      default: '';
    }
    goPrevStep()
  }

  /** 다음 step 버튼 클릭 핸들러 */
  const stepButtonNextClickHandler = () => {
    switch (step) {
      case 2:
        if(!cupFull) {
          setModalCupFullRequired(true)
          setTimeout(()=>{
            setModalCupFullRequired(false)
          }, 2000)
          return;
        } 
        break;
      case 3:
        if(watch('title')?.length === 0 || watch('content').length === 0 ) return;
        setCupState({...cupState, subStep: 0})
        return;
      default: '';
    }
    goNextStep();
  }
  
  /** 이전 subStep 버튼 클릭 핸들러 */
  const subStepButtonPrevClickHandler = () => {
    goPrevSubStep();
  }
  
  /** 다음 subStep 버튼 클릭 핸들러  */
  const subStepButtonNextClickHandler = () => {
    goNextSubStep()
  }

	return (
		<Navigation empty={true}>
      {!ingredientDeleteMode && 
        <>
          {step0 &&
            <NavButtonGoBack />
          }

          {!step0 &&
            !(step2 && !subStep0) &&
            <NavButtonPrevLevel onClick={stepButtonPrevClickHandler} />
          }

          {(step2 && !subStep0) &&
            <NavButtonPrevSublevel onClick={subStepButtonPrevClickHandler} />
          }

          {stepEnd &&
            <NavButtonDone />
          }

          {!stepEnd &&
            !(step2 && !subStepEnd) &&
            <NavButtonNextLevel 
              disabled={nextDisabled} 
              onClick={stepButtonNextClickHandler} 
              disableStyle={buttonDisableStyle}
            />
          }

          {(step2 && !subStepEnd) &&
            <NavButtonNextSublevel 
              disabled={nextDisabled} 
              onClick={subStepButtonNextClickHandler} 
            />
          }

          <h4 className="title">레시피 만들기</h4>

          {/* 모달 리스트 */}
          {modalCupFullRequired && 
            <ToastMessage
              text={'재료를 전부 채우지 않으면\n다음 단계로 넘어갈 수 없어요!'}
            />  
          }
          {showComfirmBox && 
            <ConfirmBox
              text={'이전 버튼을 누를 시\n전체량 선택부터 새로 하셔야 합니다.'}
              confirmButtonText={'새로하기'}
              onComfirmed={goFirstConfirmed}
              onDenied={goFirstDenied}
            />
          }
        </>
      }
      
		</Navigation>
	)
}

export default RecipeCreateNavigation;