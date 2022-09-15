import ToastMessage from "../components/elements/modal/ToastMessage";
import RecipeCreateWrap from "../components/recipeCreate/RecipeCreateWrap";

import imageUrl from '../assets/image/illustration/illustration04.png'
import ConfirmBox from "../components/elements/modal/ConfirmBox";

const RecipeCreate = () => {
  return (
    <>
      <ConfirmBox 
        text={'이전 버튼을 누를 시\n전체량 선택부터 새로 하셔야 합니다.'}
        confirmButtonText={'새로하기'}
        onComfirmed={()=>alert('확인')}
        onDenied={()=>alert('취소')}
      />
      {/* <ToastMessage
        text={'축하합니다!\n레시피를 완성하였습니다!'}
        imageUrl={imageUrl}
      /> */}
      {/* <ToastMessage
        text={'재료를 전부 채우지 않으면\n다음 단계로 넘어갈 수 없어요!'}
      /> */}
      <RecipeCreateWrap />
    </>
  );
};

export default RecipeCreate;
