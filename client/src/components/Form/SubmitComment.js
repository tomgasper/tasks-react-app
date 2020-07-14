import React, { useState } from 'react'

import SendIcon from '../../img/Icons/SendIcon'
import SubmitImg from './SubmitImg'

import { getTaskComments, postTaskComment } from '../../handlers/taskDetailsHandlers'

const SubmitComment = ({ user, id, dispatch }) => {
    const [ text, setText ] = useState('');


    const handleSendComment = (e,txt,id) => {
        e.preventDefault()
            if (txt) {
                console.log(txt)
                const comment = txt
    
            dispatch( postTaskComment( comment,id ) ) // REQUEST TO ADD NEW COMMENT
            .then( () => dispatch( getTaskComments(id) ) ) // REFRESH COMMENT SECTIONS AFTER
            setText('')
            }
        
    }

    return(
           <div className="taskpage-form-comment"> { user ? <form className="taskpage-form" onSubmit={ (e) => handleSendComment(e, text,id) } >
            <input
            placeholder='Your comment here...'
            id='taskpage-addcomment'
            value={ text }
            onChange={ (e) => setText(e.target.value) }
            type="text" />
            <div className='taskpage-submit'>
                <SendIcon onClick={ (e) => handleSendComment(e, text,id) } />
                <SubmitImg id={ id } dispatch={ dispatch } />
            </div>
            </form> : null }
            </div>
    )
}

export default SubmitComment