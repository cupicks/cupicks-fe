import styled from "styled-components";

const RecipeCreateModal = (props) => {
  const {setCupState, onClick} = props;

  return (
    <StModal
      onClick={()=>{
        setCupState(prev => ({...prev, ingredientDeleteMode: false}))
        document.querySelector('.ingredientSelected').classList.remove('ingredientSelected')
      }}
    >
      <span 
        className="button_close"
      >
        취소
      </span>
      <button
        type="button" 
        onClick={onClick}
      >
        x
      </button>
    </StModal>
  )
};

export default RecipeCreateModal;

const StModal = styled.div`
  width: 100vw;
  height: 100vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  
  background: rgba(0, 0, 0, 0.3);
  
  .button_close {
    position: absolute;
    top: 1.2rem;
    left: 1.5rem;
  
    color: #fff;
    
    font-size: 1.4rem;
    font-weight: 700;
  }
`