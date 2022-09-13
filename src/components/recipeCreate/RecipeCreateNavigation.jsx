import Navigation from "../../partial/Navigation";
import NavButtonDone from "../elements/button/NavButtonDone";
import NavButtonGoBack from "../elements/button/NavButtonGoBack";
import NavButtonNextLevel from "../elements/button/NavButtonNextLevel";
import NavButtonNextSublevel from "../elements/button/NavButtonNextSublevel";
import NavButtonPrevLevel from "../elements/button/NavButtonPrevLevel";
import NavButtonPrevSublevel from "../elements/button/NavButtonPrevSublevel";

const RecipeCreateNavigation = (props) => {
	const { cupState, setCupState, stepState, setStepState, formProps } = props;
  const { ingredientDeleteMode, cupFull } = cupState
  const { step, finalStep, subStep, finalSubStep } = stepState
  const { watch } = formProps

  // 레시피 만들기 상태 관리
  const step0 = step === 0;
  const step2 = step === 2;
  const stepEnd = step === finalStep;
  const subStep0 = subStep === 0;
  const subStepEnd = subStep === finalSubStep;

  const isCupFullButtonDisable = !cupFull ? 'disabled' : null

  // Step 이동하는 함수: 총 4개
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

  // 버튼 클릭 핸들러: 총 4개
  /** '이전으로' 버튼 클릭 핸들러*/
  const stepButtonPrevClickHandler = () => {
    goPrevStep()
  }
	
  /** 다음 step의 컴포넌트 랜더링 하기 전 조건 확인 */
  const stepButtonNextClickHandler = () => {
    switch (step) {
      case 0:
        if(watch('cupSize') === null) return;
        break;
      case 1:
        if(watch('isIced') === null) return;
        break;
      case 2:
        if(!cupFull) {
          alert('재료를 전부 채우지 않으면 \n 다음 단계로 넘어갈 수 없어요!')
          return;
        } 
        if(watch('ingrediantList')?.length === 0) return;
        setCupState({...cupState, subStep: 0})
        break;
      case 3:
        if(watch('title')?.length === 0 || watch('content').length === 0 ) return;
        setCupState({...cupState, subStep: 0})
        break;
        default: '';
      }
    goNextStep();
  }
  
  
  /** 이전 subStep */
  const subStepButtonPrevClickHandler = () => {
    goPrevSubStep();
  }
  
  /** 다음 subStep의 컴포넌트 랜더링 하기 전 조건 확인  */
  const subStepButtonNextClickHandler = () => {
    // switch (subStep) {
    //   case 0:
    //     if(watch(`ingrediantList.${idx}.ingredientName`) === '') return;
    //     break;
    //   case 1:
    //     if(isNaN(watch(`ingrediantList.${idx}.ingredientAmount`))) return;
    //     break;
    //   case 2:
    //     if(watch(`ingrediantList.${idx}.ingredientColor`).length === 0) return;
    //     break;
    //   default: '';
    // }
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
            <NavButtonNextLevel onClick={stepButtonNextClickHandler} />
          }

          {(step2 && !subStepEnd) &&
            <NavButtonNextSublevel disabled={isCupFullButtonDisable} onClick={subStepButtonNextClickHandler} />
          }

          <h4 className="title">레시피 만들기</h4>
        </>
      }
      
		</Navigation>
	)
}

export default RecipeCreateNavigation;