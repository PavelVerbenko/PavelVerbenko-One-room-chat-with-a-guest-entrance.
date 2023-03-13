import './input.sass';
import attach from '../../img/attach.svg'
import send from '../../img/send.svg'
import Attachment from './Attachment/Attachment';
import { useState, useEffect, useRef } from 'react';

const Input = ({ onSubmit }) => {
    const [value, setValue] = useState('')
    const [img, setImg] = useState(null)
    const textarea = useRef(null)
    
    useEffect(() => {
        textarea.current.style.height = '0px'
        const scrollHeight = textarea.current.scrollHeight
        textarea.current.style.height = `${scrollHeight}px`
    })
    function removeImg() {
        URL.revokeObjectURL(img.url)
        setImg(null) 
    }

    function uploadImg(e) {
        setImg({
            url: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
        e.target.value = null
    }
    
    function handleSubmit() {
        onSubmit({
            text: value,
            img
        })
        setValue("")
        setImg(null)
    }

    return (
        <div className="conteiner">
            <Attachment img={img?.url} onClose={removeImg}/>
            <div className="input_form">
                <label className="input_icon">
                    <img src={attach} alt="attach" />
                    <input type="file" 
                    onChange={uploadImg}
                    accept=".jpg, .jpeg, .png"/>
                </label>
                <textarea className="line"  rows="1" placeholder="Ваше сообщение" onChange={e => setValue(e.target.value)}
                value={value}
                ref={textarea}/>
                {!value && !img ? null : <button className="input_icon">
                    <img src={send} alt="send" placeholder="Ваше сообщение" onClick={handleSubmit}/>
                </button>}
            </div>
        </div>
        )
}
export default Input;