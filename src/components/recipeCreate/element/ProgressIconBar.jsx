import styled from "styled-components"
import progress1 from '../../../assets/svg/makerecipe_first.svg'
import progress2 from '../../../assets/svg/makerecipe_second.svg'
import progress3 from '../../../assets/svg/makerecipe_third.svg'

const ProgressIconBar = (props) => {
  const {stepState} = props

  const isOnProgess1 = stepState.step === 0 ? 'on' : ''
  const isOnProgess2 = stepState.step === 1 ? 'on' : ''
  const isOnProgess3 = stepState.step === 2 ? 'on' : ''

  return (
    <StWrap>
      <div className={'progress fcc '+isOnProgess1}>
        <img src={progress1} alt="음료 용량 선택하기 단계" />
      </div>
      <div className={'progress fcc '+isOnProgess2}>
        <img src={progress2} alt="음료 타입 고르기 단계" />
      </div>
      <div className={'progress fcc '+isOnProgess3}>
        <img src={progress3} alt="재료 고르기 단계" />
      </div>
    </StWrap>
  )
}

export default ProgressIconBar

const StWrap = styled.div`
  width: 100%;

  position: fixed;
  top: 55px;
  z-index: 999;

  display: flex;
  justify-content: center;
  gap: 15px;

  .progress {
    width: 18px;
    height: 18px;
    border-radius: 50%;

    background-color: #cdcdcd;
    
    transition: background-color .2s;
  }
  
  .progress.on {
    background-color: #393939;
  }
`