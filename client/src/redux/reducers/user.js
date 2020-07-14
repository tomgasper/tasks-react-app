const initialState = {
    name: '',
    isLoading: false,
    shouldRedirect: false,
    redirectTo: '',
    error: ''
}

const user = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_LOG_IN_REQUEST':
            return {
                ...state,
                isLoading: true,
                shouldRedirect: false
            }
        case 'FETCH_LOG_IN_SUCCESS':
            return {
                ...state,
                name: action.payload.user,
                isLoading: false,
                shouldRedirect: true,
                redirectTo: ''
            }
        case 'FETCH_LOG_IN_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        case 'RETRIVE_USER_REQUEST':
            return {
                ...state,
                isLoading: true,
                shouldRedirect: false
            }
        case 'RETRIVE_USER':
            return {
                ...state,
                name: action.payload.user,
                isLoading: false,
                shouldRedirect: true,
                redirectTo: action.payload.url
            }
        case 'RETRIVE_USER_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        case 'REDIRECT':
            return {
                ...state,
                shouldRedirect: false,
                redirectTo: '/'
            }
        default:
            return state
    }
}

export default user