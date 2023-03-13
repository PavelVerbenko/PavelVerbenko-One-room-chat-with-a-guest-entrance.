import './header.sass';
import close from '../../img/close.svg'
import UserInfo from '../UserInfo/userInfo';
import { useState } from 'react';

const Header = ({ text, users }) => {
    const [hidden, setHidden] = useState(true)
    return (
        <div className="header">
            <div className="header_title" onClick={() => setHidden(V => !V)}>
                <img className="header_close" src={close} alt="close"/>
                {text}
            </div>
            <div className={`users_list ${hidden ? "users_list_hidden" : ""}`}>
                <ul>
                    {!users ? null : users.map(user => (
                        <li key={user.id}>
                            <UserInfo 
                                name={user.name}                 
                                avatar={user.avatar}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Header;
