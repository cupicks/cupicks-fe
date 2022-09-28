import iceIcon from '../../../assets/svg/ice.svg'
import hotIcon from '../../../assets/svg/hot.svg'

const IsIcedIcon = (props) => {
  return (
    <div>
      {props.isIced?
        <img src={iceIcon} />
        :
        <img src={hotIcon} />
      }
    </div>
  )
};

export default IsIcedIcon;