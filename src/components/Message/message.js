import './message.sass';
import UserInfo from '../UserInfo/userInfo';

const Message = ({ text, imgUrl, user }) => {
    return (
        <div className="message_wrapper">
            <UserInfo 
                name={user.name}
                avatar={user.avatar}
            />
            <div className="message_block">
                {!imgUrl ? null : <div className="meassage_img">
                    <img src={imgUrl} alt="meassage_img"/>
                </div>}
                <span className="meassage_text">
                    { text }
                </span>
            </div>
        </div>
    )
}

export default Message;
