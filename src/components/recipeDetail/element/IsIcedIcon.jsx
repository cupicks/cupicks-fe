import iceIcon from "../../../assets/svg/ice.svg";
import hotIcon from "../../../assets/svg/hot.svg";

const IsIcedIcon = (props) => {
  return (
    <div>
      {props.isIced ? (
        <img src={iceIcon} alt="얼음 음료 아이콘" />
      ) : (
        <img src={hotIcon} alt="뜨거운 음료 아이콘" />
      )}
    </div>
  );
};

export default IsIcedIcon;
