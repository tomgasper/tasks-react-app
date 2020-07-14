const initialState = {
    isLoading: false,
    isTaskDetailsLoading: false,
    isTaskCommentsLoading: false,
    isPostingComment: false,
    isPositngImg: false,
    postCommentError: '',
    fetchError: '',
    data: '',
    comments: ''
}

const taskDetails = (state= initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASK_DETAILS_REQUEST':
            return {
                ...state,
                isTaskDetailsLoading: true
            }
        case 'FETCH_TASK_DETAILS_SUCCESS':
            return {
                ...state,
                isTaskDetailsLoading: false,
                data: action.payload.data
            }
        case 'FETCH_TASK_DETAILS_ERROR':
            return {
                ...state,
                isTaskDetailsLoading: false,
                fetchError: action.payload.error
            }
        case 'FETCH_TASK_COMMENTS_REQUEST':
            return {
                ...state,
                isTaskCommentsLoading: true
            }
        case 'FETCH_TASK_COMMENTS_SUCCESS':
            return {
                ...state,
                isTaskCommentsLoading: false,
                comments: action.payload.data
            }
        case 'FETCH_TASK_COMMENTS_ERROR':
            return {
                ...state,
                isTaskCommentsLoading: false,
                fetchError: action.payload.error
            }
        case 'POST_TASK_COMMENT_REQUEST':
            return {
                ...state,
                isPostingComment: true,
            }
        case 'POST_TASK_COMMENT_SUCCESS':
            return {
                ...state,
                isPostingComment: false,
            }
        case 'POST_TASK_COMMENT_ERROR':
            return {
                ...state,
                isPostingComment: false,
                postCommentError: action.payload.error
            }
        default:
            return state
    }
}

export default taskDetails