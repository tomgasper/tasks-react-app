import React, {useState, useEffect} from 'react'
import { Router, withRouter } from 'react-router-dom'
import { onSubmitLogin } from '../../handlers/userHandlers'

import './Login.css'

import { connect } from 'react-redux'

import ErrorPopUp from '../../components/ErrorPopUp'

/* REDUX */
const mapStateToProps = (state) => ({
    user: state.user.name,
    logInError: state.user.error
})

const LogIn = ({
    dispatch,
    logInError
    }) => {
    const [inputText, setInputText] = useState('')
    const [inputPwd, setInputPwd ] = useState('')

    return (
        <div id="login-container">
            { logInError && logInError != 'Unauthorized' ? <ErrorPopUp error={logInError}/>: null }
            <div id="login">
                <div id="login-form-container">
                <form className="login-form"
                    onSubmit={ (e) => dispatch( onSubmitLogin(e) )
                    }>
                    <input onChange={ (e) => setInputText(e.target.value) } type='text' id='loginUsername' placeholder="Username" />
                    <input onChange={ (e) => setInputPwd(e.target.value) } type='password' id='loginPwd' placeholder="Password"/>
                    { inputText && inputPwd ? <button id="login-submit-button" type="submit">Log In!</button> : null } 
                </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(connect(mapStateToProps,null)(LogIn))