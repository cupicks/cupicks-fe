/** 레벨이 2이고, 서브레벨이 0이 아닐 때 */
const NavButtonPrevSubLevel = (props) => {
  const {onClick, disabledStyle=null} = props
  const classStyle = disabledStyle ? ' disable' : '';

  return (
    <button
      type='button'
      className={`sublevel_button${classStyle}`}
      onClick={onClick}
    > 
      이전
    </button>
  )
}

export default NavButtonPrevSubLevel;