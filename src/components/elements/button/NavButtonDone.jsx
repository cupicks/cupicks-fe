import React from "react";

/** 마지막 레벨일 때 */
const NavButtonDone = ({disabledStyle, onClick, disabled}) => {
  const classStyle = disabledStyle ? 'disable' : ''

  return (
    <button
      type='submit'
      className={`${classStyle}`}
      onClick={onClick}
      disabled={disabled}
    > 
      저장
    </button>
  )
};

export default NavButtonDone