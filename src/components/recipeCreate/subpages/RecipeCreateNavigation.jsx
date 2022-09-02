import { useNavigate } from "react-router-dom";

import Navigation from "../../../partial/Navigation";

const RecipeCreateNavigation = (props) => {
  const navigate = useNavigate();
	const {
		watch,
		level, finalLevel, setLevel,
		sublevel, finalSublevel, setSublevel,
		sublevelButtonPrevClickHandler, 
		sublevelButtonNextClickHandler } = props;
		
  /** 이전 level */
  const levelButtonPrevClickHandler = () => {
    level > 0 && setLevel(prev => prev - 1);
  }
	
  /** 다음 level의 컴포넌트 랜더링 하기 전 조건 확인 */
  const levelButtonNextClickHandler = () => {
    switch (level) {
      case 0:
        if(watch('cupSize') === null) return;
        break;
      case 1:
        if(watch('isIced') === null) return;
        break;
      case 2:
        if(watch('ingrediantList').length === 0) return;
        setSublevel(0)
        break;
      case 3:
        if(watch('title').length === 0 || watch('content').length === 0 ) return;
        setSublevel(0)
        break;
        default: '';
      }
    level < finalLevel + 1 ? setLevel(prev => prev + 1) : '';
  }

	return (
		<Navigation empty={true}>

			{/* NavButtonGoBack */}
			{/* 0레벨일 때 */}
			{level === 0 &&
				<button onClick={()=>{
					navigate(-1);
				}}> 
					취소
				</button>
			}

			{/* NavButtonPrevLevel */}
			{/* 2레벨이 아닐 때 */}
			{level !== 2 &&
				<button onClick={()=>{
					levelButtonPrevClickHandler();
				}}> 
					이전
				</button>
			}

			{/* NavButtonPrevSublevel */}
			{/* 2레벨이 아닐 때 */}
			{level === 2 &&
				<>
					<button
						className="sublevel_button"
						onClick={()=>{
							sublevelButtonPrevClickHandler();
						}}> 
						이전
					</button>
				</>
			}

			{/* NavButtonDone */}
			{/* NavButtonNextLevel */}
			{/* NavButtonNextSublevel */}

			{level === 2 &&
				<>
					<button
						className="sublevel_button"
						onClick={()=>{
							sublevelButtonPrevClickHandler();
						}}> 
						이전
					</button>
				</>
			}

			<h4>레시피 만들기</h4>
			
			{level !== 2 &&
				<>
					<button
						onClick={()=>{
							levelButtonNextClickHandler();
					}}>
						{level === finalLevel ? '저장' : '다음'}
					</button>
				</>
			}
			{(level === 2) &&
				<>
					<button 
						className="sublevel_button"
						onClick={()=>{
							sublevelButtonNextClickHandler();
					}}>
						{sublevel === finalSublevel ? '재료 고르기 완료' : '다음'}
					</button>
				</>
			}

			
		</Navigation>
	)
}

export default RecipeCreateNavigation;