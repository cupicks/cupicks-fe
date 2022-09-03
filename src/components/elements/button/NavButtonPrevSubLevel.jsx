/** 레벨이 2이고, 서브레벨이 0이 아닐 때 */
const NavButtonPrevSubLevel = ({onClick}) => {
  return (
    <button
      className="sublevel_button"
      onClick={onClick}> 
      이전
    </button>
  )
}

export default NavButtonPrevSubLevel;