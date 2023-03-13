import './Attachment.sass';
import close from '../../../img/close.svg'

const Attachment = ({ img, onClose }) => {
    return !img ? null :(
        <button className="attachment" onClick={onClose}>
            <img 
                className="close"
                src={close}
                alt="close"
            />
            <img 
                className="attachment_img"
                src={img}
                alt="attachment"
            />
        </button>
    )
}

export default Attachment;
