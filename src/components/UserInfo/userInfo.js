import './userInfo.sass';

const UserInfo = ({ name, avatar }) => {
    return (
        <div className="user_info">
            <div className="user_icon">
                <img src={avatar} alt="user avatar"/>
            </div>
            <div className="user_text">
                {name}
            </div>
        </div>
    )
}

export default UserInfo;
