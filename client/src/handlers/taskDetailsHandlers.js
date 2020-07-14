import toBase64 from '../utilities/toBase64'

import taskDetailsActions from '../redux/actions/taskDetailsActions'
import { fetchGet, handleFetchGet, postData, handlePostData } from '../handlers/helpers.js'


export const getTaskDetails = (id) => {

    return handleFetchGet(
        fetchGet('/api/tasks/getTaskDetails', id),
        taskDetailsActions.fetchTaskDetailsRequest,
        taskDetailsActions.fetchTaskDetailsSuccess,
        taskDetailsActions.fetchTaskDetailsError
         )
    
}

export const getTaskComments = (id) => {

    return handleFetchGet(
        fetchGet('/api/tasks/getTaskComments', id),
        taskDetailsActions.fetchTaskCommentsRequest,
        taskDetailsActions.fetchTaskCommentsSuccess,
        taskDetailsActions.fetchTaskCommentsError
         )
    
}

export const postTaskComment = ( inputData, id) => {

    return handlePostData(
        postData('/api/tasks/addComment', inputData, id),
        taskDetailsActions.postTaskCommentRequest,
        taskDetailsActions.postTaskCommentSuccess,
        taskDetailsActions.postTaskCommentError
         )
}

export const sendImg = (file,name) => {
    return toBase64(file)
      .then(res => {
          const data = res
          
          return fetch('/api/tasks/comment/addImg', {
              body: JSON.stringify({
                  data:data,
                  name: name
                }),
              method: 'POST',
              headers: {
                'content-type': 'application/json' // likely there for common types
              }
            })
    })
    .then( res => res.json() )
  }

export const handleSubmitImg = (dispatch, file, id) => {
  sendImg(file)
  .then( res =>
    dispatch( postTaskComment( res.url,id ) )) // REQUEST TO ADD NEW COMMENT
  .then( () => dispatch( getTaskComments(id) ) ) // REFRESH COMMENT SECTIONS AFTER  
}

export const handleSendImg = (dispatch, file,id) => {
    sendImg(file).then( res => handleSubmitImg(dispatch, res.url,id) )
}