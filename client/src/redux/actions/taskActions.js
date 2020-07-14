const taskActions = {
    fetchTasksRequest: () => ({
        type: 'FETCH_TASKS_REQUEST',
        payload: {
            msg: 'Fetching Tasks...'
        }
    }),
    fetchTasksSuccess: (response) => ({
        type: 'FETCH_TASKS_SUCCESS',
        payload: {
            tasks: response
        }
    }),
    fetchTasksError: (response) => ({
        type: 'FETCH_TASKS_ERROR',
        payload: {
            error: response
        }
    }),
    toggleAddTask: (response) => ({
        type: 'TOGGLE_ADD_TASK_WINDOW',
        payload: {
            data: response
        }
    }),
    postTaskRequest: () => ({
        type: 'POST_TASK_REQUEST',
        payload: {
            msg: 'Fetching Tasks...'
        }
    }),
    postTaskSuccess: (response) => ({
        type: 'POST_TASK_SUCCESS',
        payload: {
            data: response
        }
    }),
    postTaskError: (response) => ({
        type: 'POST_TASK_ERROR',
        payload: {
            error: response
        }
    }),
    deleteTaskRequest: () => ({
        type: 'DELETE_TASK_REQUEST'
    }),
    deleteTaskSuccess: () => ({
        type: 'DELETE_TASK_SUCCESS'
    }),
    deleteTaskError: (response) => ({
        type: 'DELETE_TASK_ERROR',
        payload: {
            error: response
        }
    })
}

export default taskActions