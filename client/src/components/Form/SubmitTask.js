import React, { useState, useEffect } from 'react'
import { addNewTask,toggleAddTask } from '../../handlers/taskHandlers'
import { sendImg,postTaskComment } from '../../handlers/taskDetailsHandlers'

import {connect} from 'react-redux'
import ImgIcon from './ImgIcon'

const mapStateToProps = (state) => ({
    user: state.user.name,
    isAddTaskWindow: state.tasks.isAddTaskWindow
})

const SubmitTask = ({user,dispatch,isAddTaskWindow}) => {
    const [text, setText] = useState('')
    const [imgUpload, setImgUpload] = useState('')

    const handleText = (e) => {
        e.target.style.height = 'auto';
        const lineH = e.target.scrollHeight
        let textValue = e.target.value
        var newHeight = (lineH > 60 ? lineH : 60);
        setText(textValue)
        e.target.style.height = newHeight.toString() + 'px';
    }

    const onImgAdd = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(file)
            if ( file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg" ) {
                if (file.size > 3000000 ) {
                    alert('FILE TOO BIG')
            }
                else {
                    setImgUpload(`Uploading ${file.name}...`)

                    sendImg( e.target.files[0], file.name ) // RETURNS OBJECT WITH UPLOAD PARAMS
                    .then( setImgUpload )
                    }
                }  
            else {
                alert('BAD FORMAT, CHOOSE ANOTHER FILE')
            }

            
        }
        else return null
    }

    const onSubmitNew = (e) => {
        e.preventDefault()
        const inputText = e.target['newtask-input'].value

        dispatch( addNewTask(inputText) ) //FIRST ADD NEW TASK
        .then( 
            (obj) => {
                if (obj.res.status === 200 && imgUpload.url ) { // GET IMG URL FROM CURRENT STATE 
                    const id = obj.body // GET ID TASK FROM SERVER
                    dispatch( postTaskComment( imgUpload.url,id ) )
            }
        }
         )
        dispatch( toggleAddTask(isAddTaskWindow) )
        
    }

    return(
        <div className='form-addtask-container' >
           {user ? <form className='form-addtask' onSubmit={ onSubmitNew } >
                <textarea
                className='form-addtask-input'
                placeholder='Type your new task...'
                type="text" id="newtask-input"
                onChange={ handleText }
                />
                 <div className='form-addtask-icons'>
                 <label for="task-img">
                    <div className='form-addtask-img' onClick={ (e) => console.log(e) }><ImgIcon /></div>
                </label>
                    <input className='form-addtask-img-input' type='file' id='task-img' onChange={ onImgAdd } />
                    {/* <div className='form-addtask-tag'>@</div> */}
                    </div>
                    <div className='form-addtask-files'>{imgUpload.public_id ? <div className='form-addtask-file-loading'>{imgUpload.public_id}</div> : <div className='form-addtask-file-done'>{imgUpload}</div>}</div>
                {text ? <button className='form-addtask-button'>Add</button> : null } 
               
            </form> : <p>Log in to post your task</p> } 
        </div>
    )
}

export default connect(mapStateToProps)(SubmitTask)
