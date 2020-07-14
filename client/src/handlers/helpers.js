export const fetchGet = (url, id) => {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
    .then( res => res.json().then( data => ({
        res: res,
        body: data
    })))
}

export const handleFetchGet = (fnc,req,suc,err ) => {
    return (dispatch) => {
        dispatch( req() ) // DISPATCH REDUX ACTION
        return fnc.then( ({res,body}) => {
            if (res.status === 200) {
                console.log('Server responded')
                dispatch( suc(body) )
            }
            else {
                dispatch( err(body) )
            }
        })
    }
}

export const postData = (url, inputData, id) => {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            data: inputData
        })
    }).then( res => res.json().then( data => ({
        res: res,
        body: data
    })))
}

export const handlePostData = (fnc,req,suc,err ) => {
    return (dispatch) => {
        dispatch( req() ) // DISPATCH REDUX ACTION
        return fnc.then( ({res,body}) => {
            if (res.status === 200) {
                console.log('Server responded')
                dispatch( suc(body) )
            }
            else {
                dispatch( err(body) )
            }
        })
    }
}
