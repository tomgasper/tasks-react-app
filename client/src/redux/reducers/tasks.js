const initialState = {
    recent: [],
    isLoading: false,
    fetchError: '',
    shouldRefresh: false,
    postError: '',
    isTaskDeleteFetching: true,
    deleteError: '',
    isAddTaskWindow: false
}

const tasks = (state= initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS_REQUEST':
            return {
                ...state,
                isLoading: true,
            }
        case 'FETCH_TASKS_SUCCESS':
            return {
                ...state,
                recent: action.payload.tasks,
                isLoading: false,
                shouldRefresh: false
            }
        case 'FETCH_TASKS_ERROR':
            return {
                ...state,
                isLoading: false,
                fetchError: action.payload.error
            }
        case 'TOGGLE_ADD_TASK_WINDOW':
            return {
                ...state,
                isAddTaskWindow: action.payload.data
            }
        case 'POST_TASK_REQUEST':
            return {
                ...state,
                isTasksLoading: true,
                shouldRefresh: false
            }
        case 'POST_TASK_SUCCESS':
                return {
                    ...state,
                    isTasksLoading: false,
                    shouldRefresh: true,
                }
        case 'POST_TASK_ERROR':
                return {
                    ...state,
                    isTasksLoading: false,
                    shouldRefresh: false,
                    postError: action.payload.error
                    }
        case 'DELETE_TASK_REQUEST':
            return {
                ...state,
                isTaskDeleteFetching: true
            }
        case 'DELETE_TASK_SUCCESS':
                return {
                    ...state,
                    isTaskDeleteFetching: false
                }
        case 'DELETE_TASK_ERROR':
                return {
                    ...state,
                    isTaskDeleteFetching: false,
                    deleteError: action.payload.error
                    }
        default:
            return state
    }
}

export default tasks