import React, {useState} from 'react'
import { signUp,handleRedirect } from '../../handlers/userHandlers'
import userActions from '../../redux/actions/userActions'

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({

})

const SignUp = ({dispatch}) => {
    const [inputText, setInputText] = useState('')
    const [inputPwd, setInputPwd ] = useState('')
    const [inputEmail, setInputEmail ] = useState('')

    const handleOnSubmit = (e) => {
        if (inputText && inputPwd && inputEmail) {
            signUp(e)
            .then( () => handleRedirect(dispatch, undefined, '/login') )
        }
        else {
            dispatch(
                userActions.fetchLogInError('You need to fill out all the fields')
            )
        }
    }

    return(
        <div id="signup-container">
            <div id="signup">
                <div id="signup-form-container">
                    <form id="signup-container" onSubmit={ handleOnSubmit }>
                        <input
                        onChange={ (e) => setInputText(e.target.value) }
                        type="text" id="signUsername" placeholder="Username" />
                        <input
                        onChange={ (e) => setInputPwd(e.target.value) }
                        type="text" id="signEmail" placeholder="Email" />
                        <input
                        onChange={ (e) => setInputEmail(e.target.value) }
                        type="password" id="signPassword" placeholder="Password" />
                        { inputText && inputPwd && inputEmail
                        ? <button id="login-submit-button" type="submit">Sign up</button> : null }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(SignUp)