const IsIcedIcon = (props) => {
  let result = null;
  if(props.isIced!==null){
    result = props.isIced?"ice":"hot";
  }

  return (
    <>
      {result}
    </>
  )
};

export default IsIcedIcon;