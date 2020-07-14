const taskDetailsActions = {
    fetchTaskDetailsRequest: () => ({
        type: 'FETCH_TASK_DETAILS_REQUEST',
        payload: {
            msg: 'Fetching Tasks...'
        }
    }),
    fetchTaskDetailsSuccess: (response) => ({
        type: 'FETCH_TASK_DETAILS_SUCCESS',
        payload: {
            data: response
        }
    }),
    fetchTaskDetailsError: (response) => ({
        type: 'FETCH_TASK_DETAILS_ERROR',
        payload: {
            error: response
        }
    }),
    fetchTaskCommentsRequest: () => ({
        type: 'FETCH_TASK_COMMENTS_REQUEST',
        payload: {
            msg: 'Fetching Tasks...'
        }
    }),
    fetchTaskCommentsSuccess: (response) => ({
        type: 'FETCH_TASK_COMMENTS_SUCCESS',
        payload: {
            data: response
        }
    }),
    fetchTaskCommentsError: (response) => ({
        type: 'FETCH_TASK_COMMENTS_ERROR',
        payload: {
            error: response
        }
    }),
    postTaskCommentRequest: () => ({
        type: 'POST_TASK_COMMENT_REQUEST',
        payload: {
            msg: 'Posting...'
        }
    }),
    postTaskCommentSuccess: (response) => ({
        type: 'POST_TASK_COMMENT_SUCCESS',
        payload: {
            data: response
        }
    }),
    postTaskCommentError: (response) => ({
        type: 'POST_TASK_COMMENT_ERROR',
        payload: {
            error: response
        }
    }),
    postTaskImgRequest: () => ({
        type: 'POST_TASK_IMG_REQUEST',
        payload: {
            msg: 'Posting...'
        }
    }),
    postTaskImgSuccess: (response) => ({
        type: 'POST_TASK_IMG_SUCCESS',
        payload: {
            data: response
        }
    }),
    postTaskImgError: (response) => ({
        type: 'POST_TASK_IMG_ERROR',
        payload: {
            error: response
        }
    }),
}

export default taskDetailsActions