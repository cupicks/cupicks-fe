/** 마지막 레벨일 때 */
const NavButtonDone = ({onClick, isDisabled}) => {
  const disabled = isDisabled ? 'disabled' : ''
  console.log(isDisabled);
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