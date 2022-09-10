/** 레벨이 0이 아닐 때 (레벨이 2이고 서브레벨이 0이 아닐 떄는 숨김) */
const NavButtonPrevLevel = ({onClick={}}) => {
  return (
    <button onClick={onClick}> 
      이전
    </button>
  )
}

export default NavButtonPrevLevel;