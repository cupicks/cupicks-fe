/** 레벨이 마지막 레벨이 아닐 때 (레벨이 2이고, 마지막 서브레벨이 아닐 때 숨김) */
const NavButtonNextLevel = (props) => {
  const {disabled=null, onClick, disableStyle=null} = props
  const classStyle = disableStyle ? 'disable' : ''

  return (
    <button
      className={`${classStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      다음
    </button>
  )
}

export default NavButtonNextLevel;