import userActions from '../redux/actions/userActions'
import history from '../utilities/history'

export const userAuth = (user,url) => {
    return (dispatch) => {
        dispatch( userActions.retriveUserRequest() )
        function logIn( serverResponse ) {
            if (serverResponse.res.status === 200 && !user ) {
                console.log(serverResponse.body)
                dispatch( userActions.retriveUser(serverResponse.body, url) )
            }
            else {
                dispatch( userActions.retriveUserError(serverResponse.body) )
            }
        }
        return fetch('/api/user/getUser')
        .then( res => res.json().then( data => ({
            res: res,
            body: data
        }) ))
        .then( logIn )
    }
}

export const fetchLogIn = (e) => {
    e.preventDefault()
    const { loginUsername, loginPwd } = e.target
    return fetch('/api/user/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: loginUsername.value,
            password: loginPwd.value
        })
    })
    .then( res => res.json().then( data => ({ // RETURN OBJECT WITH BACKEND RED AND DATA
        res: res,
        body: data
    })))
}

export const onSubmitLogin = (e) => {
    e.preventDefault()
    return (dispatch) => {
        dispatch( userActions.fetchLogInRequest() )

        return fetchLogIn(e).then( ({res,body}) => {
            if (res.status === 200) {
                console.log('dispatching' + body)
                dispatch(
                    userActions.fetchLogInSuccess(body)
                )
            }
            else {
                dispatch(
                    userActions.fetchLogInError(body)
                )
            }
        })
    }
}

export const signUp = (e) => {
        e.preventDefault()
        console.log(e.target)

        return fetch('/api/user/signup', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.signUsername.value,
                password: e.target.signPassword.value,
                email: e.target.signEmail.value
            })
        })
        .then( res => res.json() )
        .then( console.log )
    }

export const fetchLogOutRequest = (dispatch) => {
    dispatch( userActions.fetchLogOutRequest() )
}

export const fetchLogOut = () => {
    return (dispatch) => {
        dispatch( userActions.fetchLogOutRequest() )

        return fetch('/api/user/logout')
        .then( res => res.json() )
        .then( data => {
            dispatch(
                userActions.fetchLogOutSuccess(data)
            )
        })
    }
}

export const handleRedirect = (dispatch, from, to) => {
    history.push(to)
    dispatch( userActions.redirect(from,to) )
}