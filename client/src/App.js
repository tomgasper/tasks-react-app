import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch, Link } from 'react-router-dom'

import {
    userAuth,
    handleRedirect } from './handlers/userHandlers'

import history from './utilities/history'

import Homescreen from './containers/Homescreen/Homescreen'
import NavBar from './containers/NavBar/NavBar'
import LogIn from './containers/LogIn/LogIn'
import SignUp from './containers/Signup/Signup'
import TaskPage from './containers/TaskPage/TaskPage'
import UserPage from './containers/UserPage/UserPage'
import NotFoundPage from './containers/NotFoundPage/NotFoundPage'



const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading,
    user: state.user.name,
    error: state.user.error,
    shouldRedirect: state.user.shouldRedirect,
    redirectTo: state.user.redirectTo,
    tasksLoading: state.tasks.isLoading
})


const App = ({ dispatch, shouldRedirect, user,error,isLoading,redirectTo,tasksLoading }) => {
    let mountUrl = ''
    
    useEffect( () => { // CHECK CREDENTIALS ON MOUNT
        mountUrl = window.location.pathname
        dispatch( userAuth(user,mountUrl) )
    }, [])

    useEffect( () => {
        if (shouldRedirect === true) {
            handleRedirect(dispatch, undefined,redirectTo )
        }
    }, [ shouldRedirect ])

    return(
        <Router history={history}>
            <NavBar />
            <Switch>
                <Route exact path ="/login">
                    <LogIn />
                </Route>
                <Route exact path ="/signup">
                    <SignUp />
                </Route>
                <Route exact path='/'>
                    <Homescreen/>
                </Route>
                <Route path="/task">
                    <TaskPage />
                </Route>
                <Route path='/'>
                    <UserPage />
                </Route>
            </Switch>
        </Router>
    )
}

export default connect(mapStateToProps)(App)