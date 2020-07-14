import React, { useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

const mapStateToProps = (state) => ({
})

const ErrorPopUp = ({ error,dispatch }) => {
    const [ display, setDisplay ] = useState(false)

    console.log('rendering')

    const divRef = React.createRef()

    const renderPopUp = () => {
        setTimeout( () => {
            return (
                dispatch(
                    userActions.fetchLogInError(undefined)
                )
            )
        }, 1500 )
    }

    renderPopUp()

    return(
        <div ref={divRef} className="login-error" >{error}</div>
    )
}
    
export default connect(mapStateToProps)(ErrorPopUp)