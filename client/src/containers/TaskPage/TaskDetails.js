import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { getTasks,deleteTask } from '../../handlers/taskHandlers'
import { handleRedirect } from '../../handlers/userHandlers'

import moment from 'moment';

import CommentIcon from '../../img/Icons/CommentIcon'
import ClockIcon from '../../img/Icons/ClockIcon'
import DeleteBtn from '../../img/Icons/DeleteBtn'

import Emoji from '../../img/Utilities/Emoji'

const TaskDetails = ({ 
    data,
    user,
    dispatch }) => {
    const dateAdded = data.date;
    const [ currentData, setCurrentData ] = useState(data)
    const [ isAuthor, setIsAuthor ] = useState(false)
    
    const taskUrl = '/task/' + data._id
    const taskAuthor = data.author

    console.log(isAuthor)

    useEffect( () => {
        if (taskAuthor === user) setIsAuthor(true)
        else setIsAuthor(false)
    },[taskUrl] )

    const handleSubmit = (reaction) => {
        const postData = (url, inputData,id) => {
            return fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    data: inputData,
                    id: id
                })
            }).then( res => res.json().then( data => ({
                res: res,
                body: data
            })))
        }
        postData('/api/tasks/upReactionTask', reaction, data._id ).then( res => setCurrentData(res.body) )
    }
    const handleDelete = () => {
        dispatch( deleteTask(taskAuthor, data._id) )
        .then( () => handleRedirect(dispatch, undefined,'/' ) )
    }

    const renderReactions = () => {
        return (
                    <div className='taskpage-task-reactions'>
                    <Emoji symbol="🙌" label="raised hands" onClick={ () => handleSubmit('reaction1') } />
                    <div>{currentData ? currentData.reactions['reaction1'] : null}</div>
                    </div>
                )
            }

    return(
        <div className="taskpage-task-container" >
            <div className="taskpage-task-body" >
                <NavLink to={taskUrl} className='taskpage-task-body-text'>{data.body}</NavLink>
                { isAuthor ? <div className="taskpage-task-delete" onClick= { handleDelete } ><DeleteBtn /></div> : null }
                </div>
            <div className="taskpage-task-footer">
                <NavLink className='taskpage-comment-author' to={`/${taskAuthor}`}> {taskAuthor} </NavLink>
                 <div className='taskpage-task-info'>
                    <div className="taskpage-task-date" > <ClockIcon color={'black'} /> {moment(new Date(dateAdded) ).format('LT')} </div>
                    { isAuthor ? null : renderReactions() }
                 </div>
            </div>
        </div>
    )
}

export default TaskDetails