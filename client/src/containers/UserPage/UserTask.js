import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { getTasks,deleteTask } from '../../handlers/taskHandlers'

import moment from 'moment';

import CommentIcon from '../../img/Icons/CommentIcon'
import ClockIcon from '../../img/Icons/ClockIcon'
import DeleteBtn from '../../img/Icons/DeleteBtn'

import Emoji from '../../img/Utilities/Emoji'

const UserTask = ({ 
    data,
    user,
    dispatch }) => {
    const dateAdded = data.data.date;
    const [ currentData, setCurrentData ] = useState(data.data)
    const [ isAuthor, setIsAuthor ] = useState(false)
    
    const taskUrl = '/task/' + data.data._id
    const taskAuthor = data.data.author

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
        postData('/api/tasks/upReactionTask', reaction, data.data._id ).then( res => setCurrentData(res.body) )
    }

    const handleDelete = () => {
        dispatch( deleteTask(taskAuthor, data.data._id))
        .then( () => dispatch( getTasks() ) )
    }

    const renderReactions = () => {
        return (
                    <div className='userpage-task-reactions'>
                    <Emoji symbol="🙌" label="raised hands" onClick={ () => handleSubmit('reaction1') } />
                    <div>{currentData ? currentData.reactions['reaction1'] : null}</div>
                    </div>
                )
            }

    return(
        <div className="userpage-task-container" >
            <div className="userpage-task-body" >
                <NavLink to={taskUrl} className='userpage-task-body-text'>{data.data.body}</NavLink>
                { isAuthor ? <div className="userpage-task-delete" onClick= { handleDelete } ><DeleteBtn /></div> : null }
                </div>
            <div className="userpage-task-footer">
                 <div className='userpage-task-info'>
                    <div className="userpage-task-date" > <ClockIcon /> {moment(new Date(dateAdded) ).format('LT')} </div>
                    <div className="userpage-task-comments"><CommentIcon /> {data.data.commentsCount}</div>
                    { isAuthor ? null : renderReactions() }
                 </div>
            </div>
        </div>
    )
}

export default UserTask