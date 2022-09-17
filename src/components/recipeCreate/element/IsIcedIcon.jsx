import iceIcon from '../../../assets/svg/ice.svg'
import hotIcon from '../../../assets/svg/hot.svg'

const IsIcedIcon = (props) => {
  return (
    <div className='is_iced_icon_box'>
      {props.isIced?
        <img src={iceIcon} />
        :
        <img src={hotIcon} />
      }
    </div>
  )
};

export default IsIcedIcon;