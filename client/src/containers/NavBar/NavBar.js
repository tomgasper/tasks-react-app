import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { NavLink,useLocation } from 'react-router-dom'

import { fetchLogOut } from '../../handlers/userHandlers'
import { toggleAddTask } from '../../handlers/taskHandlers'

import Button from '../../img/Icons/AddBtn.js'
import ProfileIcon from '../../img/Icons/ProfileIcon'
import ExploreIcon from '../../img/Icons/ExploreIcon'
import LogOutIcon from '../../img/Icons/LogOutIcon'


import './NavBar.css'

const mapStateToProps = (state,ownProps) => ({
    user: state.user.name,
    isAddTaskWindow: state.tasks.isAddTaskWindow,
    ownProps: ownProps
})

const NavBar = ({ dispatch, user,isAddTaskWindow,ownProps }) => {
    const [ btnStyle,setBtnStyle ] = useState('');
    const [isMainPage, setIsMainPage] = useState(false);

    let location = useLocation();

    useEffect(() => {
        console.log('LOCATION')
        console.log(isMainPage)
        if (location.pathname === '/' && !isMainPage) {setIsMainPage(true) }
        if (location.pathname !== '/' ) setIsMainPage(false)
    },[location])

    console.log(location.pathname)

    const handleAddClick = () => {
        dispatch( toggleAddTask(isAddTaskWindow) )
    }

    const renderAddBtn = () => {
        if (location.pathname === '/') return (
            <Button onClick={ handleAddClick } color={btnStyle.color} rot1={btnStyle.rot1} />
        )
        else return null
    }

    const changeBtnStyle = (isAddTaskWindow) => {
        if (isAddTaskWindow === true) {
            setBtnStyle(
                {
                    color:'#B0B0B0',
                    rot1: 90
                }
                )
        }

        if (!isAddTaskWindow) {
            setBtnStyle(
                {
                    color:'#3CE298',
                    rot1: 0
                }
                )
        }
    }

    useEffect( () => {
        changeBtnStyle(isAddTaskWindow)
    }, [isAddTaskWindow])

    if ( user ) { // IF USER IS LOGGED SHOW ADD TASK BUTTON
        return(
            <div className='navbar-container'>
                { renderAddBtn() }
                <div className="navbar-icons" >
                    <NavLink activeClassName="activeLink" to={`/${user}`} alt="Profile" >
                        <ProfileIcon />
                        Profile
                        </NavLink>
                    <NavLink style={ { color: isMainPage ? '#3CE298' : 'black'  }}to="/" alt="Explore" >
                        <ExploreIcon />
                        Explore
                        </NavLink>
                    <a href='' onClick={ () => dispatch(fetchLogOut()) }>
                        <LogOutIcon />
                        Log out!</a>
                </div>
            </div>
        )
    }
    else return (
        <div className='navbar-container'>
                <NavLink activeClassName="activeLink" to="/signup" alt="Profile" >Sign Up</NavLink>
                <NavLink activeClassName="activeLink" to="/login" alt="Log in" >Log in</NavLink>
            </div>
    )
    
}

export default connect(mapStateToProps)(NavBar)