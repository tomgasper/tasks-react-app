import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    user: state.user.name
})

const PrivateRoute = ({ children, user, ...rest }) => {
    console.log(user + 'is?')
    return <Route
    {...rest}
    render = { ({ location }) =>
        user ? ( children ) :
        (
            <Redirect to={{
                pathname: "/login",
                state: {from: location}
            }}
            />
        )
    }
    />
}

export default connect(mapStateToProps, null)(PrivateRoute)