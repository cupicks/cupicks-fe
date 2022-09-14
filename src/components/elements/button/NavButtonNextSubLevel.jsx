/** 다음 서브레벨로 가는 버튼 / nextSubLevel / 레벨이 2이고, 서브레벨이 마지막 레벨이 아닐 때 */
const NavButtonNextSublevel = (props) => {
  const {disabled=null, onClick} = props
  return (
    <button
      className='sublevel_button'
      onClick={onClick}
      disabled={disabled}
    >
      다음
    </button>
  )
}

export default NavButtonNextSublevel;