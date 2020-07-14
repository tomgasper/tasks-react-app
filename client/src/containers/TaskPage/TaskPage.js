import React, { useEffect } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import Comments from '../../containers/Comments/Comments'

import { getTaskDetails, getTaskComments, postTaskComment,handleSubmitImg } from '../../handlers/taskDetailsHandlers'
import TaskDetails from './TaskDetails'
import SubmitComment from '../../components/Form/SubmitComment'
import NotFoundPage from '../../containers/NotFoundPage/NotFoundPage'

import './TaskPage.css';
import { connect } from 'react-redux'
import SubmitImg from '../../components/Form/SubmitImg'

const mapStateToProps = (state) => ({
    user:state.user.name,
    tasks: state.tasks.recent,
    taskData: state.taskDetails.data,
    taskComments: state.taskDetails.comments,
    postCommentError:state.taskDetails.postCommentError,
    commentsLoading: state.taskDetails.isTaskCommentsLoading,
})

const TaskPage = ({user, dispatch, taskData, taskComments, commentsLoading }) => {
    let location = useLocation(); // LOOKS FOR CURRENT URL
    const id = location.pathname.slice(6,location.pathname.length) // TAKES ONLY ID FROM THAT URL

    useEffect( () => {
        window.scrollTo(0, 0)
    }, []);

    useEffect( () => {
        if ( id ) {
            dispatch( getTaskDetails(id) )
            dispatch( getTaskComments(id) )
        } // IF THERES ID FETCH ITS DETAILS AND COMMENTS
        else {
        
    }
    },[] )

    console.log(taskData)

        return(
            <div className='taskpage-container'>
                <TaskDetails data={taskData} user={user} dispatch={dispatch}/>
                { !commentsLoading ? <Comments taskComments={taskComments} /> : <div>Loading...</div> }
                <div className='taskpage-form-container'>
                <SubmitComment
                id={ id }
                dispatch={ dispatch }
                user={user} />
                </div>
            </div>
        )

    
}

export default connect(mapStateToProps)(TaskPage)