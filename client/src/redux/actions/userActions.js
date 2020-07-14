const userActions = {
    fetchLogInRequest: () => ({
        type: 'FETCH_LOG_IN_REQUEST',
        payload: {
            msg: 'Loading...'
        }
    }),
    fetchLogInSuccess: (response) => ({
        type: 'FETCH_LOG_IN_SUCCESS',
        payload: {
            user: response
        }
    }),
    fetchLogInError: (response) => ({
        type: 'FETCH_LOG_IN_ERROR',
        payload: {
            error: response
        }
    }),
    fetchLogOutRequest: () => ({
        type: 'FETCH_LOG_OUT_REQUEST'
    }),
    fetchLogOutSuccess: (response) => ({
        type: 'FETCH_LOG_OUT_SUCCESS',
        payload: {
            user: response
        }
    }),
    fetchLogOutError: (response) => ({
        type: 'FETCH_LOG_OUT_ERROR',
        payload: {
            user: response
        }
    }),
    retriveUserRequest: () => ({
        type: 'RETRIVE_USER_REQUEST'
    }),
    retriveUserError: (response) => ({
        type: 'RETRIVE_USER_ERROR',
        payload: {
            error: response
        }
    }),
    retriveUser: (response, url) => ({
        type: 'RETRIVE_USER',
        payload: {
            user:response,
            url: url
        }
    }),
    redirect: (from,to) => ({
        type: 'REDIRECT',
        payload: {
            from: from,
            to: to
        }
    })
}

export default userActions