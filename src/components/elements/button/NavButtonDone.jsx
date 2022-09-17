/** 마지막 레벨일 때 */
const NavButtonDone = ({onClick, disabledStyle}) => {
  const disabled = disabledStyle ? 'disabled' : ''
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
    > 
      저장
    </button>
  )
}

export default NavButtonDone