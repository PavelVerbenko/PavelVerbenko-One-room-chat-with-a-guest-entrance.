import './main.sass';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className="main">
            <Link className="enter" to="/chat">Войти</Link>
        </div>
    )
}

export default Main;