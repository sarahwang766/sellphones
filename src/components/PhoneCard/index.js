import { Typography } from 'antd';
import './index.css';

const {Text, Paragraph} = Typography

function PhoneCard(props) {

    return(
        <div className="phone-card">
            <div className="phone-image" style={{background: `url(${props.imgUrl})`, backgroundSize:"cover"}}>
            </div>
            <div className="phone-title"><Paragraph ellipsis={{rows:3, expandable:false}}>{props.title}</Paragraph></div>
            <div className="phone-price"><h2>${props.price}</h2></div>
        </div>
    )
}

export default PhoneCard;