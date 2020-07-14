import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { getTasks,deleteTask } from '../../handlers/taskHandlers'

import { timeDifference } from '../../helpers/helpers.js'

import CommentIcon from '../../img/Icons/CommentIcon'
import ClockIcon from '../../img/Icons/ClockIcon'
import DeleteBtn from '../../img/Icons/DeleteBtn'

import Emoji from '../../img/Utilities/Emoji'

const Task = ({ 
    data,
    user,
    dispatch }) => {
    const dateAdded = data.data.date;
    const [ currentData, setCurrentData ] = useState(data.data)
    const [ isAuthor, setIsAuthor ] = useState(false)
    
    const timeDiff = timeDifference(dateAdded)
    const taskUrl = '/task/' + data.data._id
    const taskAuthor = data.data.author

    useEffect( () => {
        if (taskAuthor === user) setIsAuthor(true)
        else setIsAuthor(false)
    },[] )

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
                    <div className='homescreen-task-reactions'>
                    <Emoji symbol="🙌" label="raised hands" onClick={ () => handleSubmit('reaction1') } />
                    <div>{currentData ? currentData.reactions['reaction1'] : null}</div>
                    </div>
                )
            }

    return(
        <div className="homescreen-task-container" >
            <div className="homescreen-task-body" >
                <NavLink to={taskUrl} className='homescreen-task-body-text'>{data.data.body}</NavLink>
                { taskAuthor === user ? <div className="homescreen-task-delete" onClick= { handleDelete } ><DeleteBtn /></div> : null }
                </div>
            <div className="homescreen-task-footer">
                 <NavLink to={data.data.author} className="homescreen-task-author" > { taskAuthor === user ? <div>You</div> : data.data.author} </NavLink>
                 <div className='homescreen-task-info'>
                    <div className="homescreen-task-date" > <ClockIcon color={'#444444'} /> {timeDiff} </div>
                    <div className="homescreen-task-comments"><CommentIcon color={'#444444'} /> {data.data.commentsCount}</div>
                    { isAuthor ? null : renderReactions() }
                 </div>
            </div>
        </div>
    )
}

export default Task