import taskActions from '../redux/actions/taskActions'
import {handlePostData,postData} from '../handlers/helpers'

export const fetchTasks = () => {
    return fetch('/api/tasks/getTasks', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            data: "FILTER PLACEHOLDER"
        })
    })
    .then( res => res.json().then( data => ({ // RETURN OBJECT WITH BACKEND RED AND DATA
        res: res,
        body: data
    })))
}

export const getTasks = () => {
    return (dispatch) => {
        dispatch( taskActions.fetchTasksRequest() ) // DISPATCH REDUX ACTION
        return fetchTasks().then( ({res,body}) => {
            if (res.status === 200) {
                console.log('Server responded')
                dispatch( taskActions.fetchTasksSuccess(body) )
            }
            else {
                dispatch( taskActions.fetchTasksError(body) )
            }
        })
    }
    
}

export const postNewTask = (inputData) => {
    return fetch('/api/tasks/postTask', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            data: inputData
        })
    }).then( res => res.json().then( data => ({
        res: res,
        body: data
    })))
}

export const addNewTask = (inputData) => {
    return (dispatch) => {
        dispatch( taskActions.postTaskRequest() )
        return postNewTask(inputData).then( ({res,body}) => {
            if (res.status === 200) {
                dispatch( taskActions.postTaskSuccess(body) )
                return { res: res, body: body}
            }
            else {
                dispatch( taskActions.postTaskError(body) )
            }
        })
    }
}

export const toggleAddTask = (inputData) => {
    return (dispatch) => dispatch( taskActions.toggleAddTask(!inputData) )
}

export const deleteTask = (inputData, id) => {

    return handlePostData(
        postData('/api/tasks/deleteTask', inputData, id),
        taskActions.deleteTaskRequest,
        taskActions.deleteTaskSuccess,
        taskActions.deleteTaskError
         )
    
}