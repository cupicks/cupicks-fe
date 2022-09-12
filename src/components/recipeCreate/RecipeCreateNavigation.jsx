import Navigation from "../../partial/Navigation";
import NavButtonDone from "../elements/button/NavButtonDone";
import NavButtonGoBack from "../elements/button/NavButtonGoBack";
import NavButtonNextLevel from "../elements/button/NavButtonNextLevel";
import NavButtonNextSublevel from "../elements/button/NavButtonNextSubLevel";
import NavButtonPrevLevel from "../elements/button/NavButtonPrevLevel";
import NavButtonPrevSubLevel from "../elements/button/NavButtonPrevSubLevel";

const RecipeCreateNavigation = (props) => {
	const { cupState, setCupState } = props;
  const { level, finalLevel, sublevel, finalSublevel, ingredientDeleteMode } = cupState

  /** 이전 level */
  const levelButtonPrevClickHandler = () => {
    level > 0 && setCupState({...cupState, level: cupState.level - 1});
  }
	
  /** 다음 level의 컴포넌트 랜더링 하기 전 조건 확인 */
  const levelButtonNextClickHandler = () => {
    // switch (level) {
    //   case 0:
    //     if(watch('cupSize') === null) return;
    //     break;
    //   case 1:
    //     if(watch('isIced') === null) return;
    //     break;
    //   case 2:
    //     if(watch('ingrediantList').length === 0) return;
    //     setCupState({...cupState, sublevel: 0})
    //     break;
    //   case 3:
    //     if(watch('title').length === 0 || watch('content').length === 0 ) return;
    //     setCupState({...cupState, sublevel: 0})
    //     break;
    //     default: '';
    //   }
    level < finalLevel + 1 ? setCupState({...cupState, level: cupState.level + 1}) : '';
  }

  /** 이전 sublevel */
  const sublevelButtonPrevClickHandler = () => {
    sublevel > 0 && setCupState({...cupState, sublevel: cupState.sublevel - 1});
  }
  
  /** 다음 sublevel의 컴포넌트 랜더링 하기 전 조건 확인  */
  const sublevelButtonNextClickHandler = () => {
    // switch (sublevel) {
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
    sublevel < finalSublevel && setCupState({...cupState, sublevel: cupState.sublevel + 1});
  }

  const lv0 = level === 0;
  const lv2 = level === 2;
  const lvEnd = level === finalLevel;
  const sublv0 = sublevel === 0;
  const sublvEnd = sublevel === finalSublevel;

	return (
		<Navigation empty={true}>
      {!ingredientDeleteMode && 
        <>
          {lv0 &&
            <NavButtonGoBack />
          }

          {!lv0 &&
            !(lv2 && !sublv0) &&
            <NavButtonPrevLevel onClick={levelButtonPrevClickHandler} />
          }

          {(lv2 && !sublv0) &&
            <NavButtonPrevSubLevel onClick={sublevelButtonPrevClickHandler} />
          }

          {lvEnd &&
            <NavButtonDone />
          }

          {!lvEnd &&
            !(lv2 && !sublvEnd) &&
            <NavButtonNextLevel onClick={levelButtonNextClickHandler} />
          }

          {(lv2 && !sublvEnd) &&
            <NavButtonNextSublevel onClick={sublevelButtonNextClickHandler} />
          }

          <h4 className="title">레시피 만들기</h4>
        </>
      }
      
		</Navigation>
	)
}

export default RecipeCreateNavigation;