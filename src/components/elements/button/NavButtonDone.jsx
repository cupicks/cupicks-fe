import React from "react";

/** 마지막 레벨일 때 */
const NavButtonDone = React.forwardRef (({disabledStyle, onClick}, ref) => {
  const classStyle = disabledStyle ? 'disable' : ''

  return (
    <button
      className={`${classStyle}`}
      ref={ref}
      onClick={onClick}
    > 
      저장
    </button>
  )
});

export default NavButtonDone