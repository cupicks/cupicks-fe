/** 레벨이 마지막 레벨이 아닐 때 (레벨이 2이고, 마지막 서브레벨이 아닐 때 숨김) */
const NavButtonNextLevel = (props) => {
  const {disabled=null, onClick} = props
  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      다음
    </button>
  )
}

export default NavButtonNextLevel;