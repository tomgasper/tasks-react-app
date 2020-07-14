import './UserPage.css'

import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'

import { useLocation } from 'react-router-dom'

import UserTask from './UserTask'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import moment from 'moment'
import ClockIcon from '../../img/Icons/ClockIcon'
import MouthIcon from '../../img/Icons/Mouth'
import Loader from '../../img/Loader/Loader'

const mapStateToProps = (state,ownProps) => ({
    user:state.user.name,
    recentTasks: state.tasks.recent,
    id: ownProps
})

const UserPage = ({user,recentTasks,id,dispatch}) => {
    let location = useLocation(); // LOOKS FOR CURRENT URL
    let userName = location.pathname.slice(1,location.pathname.length) // TAKES ONLY ID FROM THAT URL

    const [ userTasks, setUserTasks ] = useState('');
    const [ err,setErr ] = useState('');

    console.log(userTasks)

    useEffect( () => {
        setErr('')
        fetchUserTasks(userName)
    },[recentTasks,userName] )

    const handleResponse = (obj) => {
        if (obj.res.status !== 200 ) {
            setErr(obj.body)
        }
        else {
            setUserTasks(obj.body)
        }
    }

    const fetchUserTasks = (user) => {
        fetch('/api/tasks/getUserTasks', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data:user
            })
        }).then( res => res.json().then( data => ({
            res:res,
            body: data
        })))
        .then( handleResponse )
    }
    
    const sortTasks = (arr) => {
        let newArr = [[]]
        arr.forEach( (item, i, arr) => {
            const date = new Date(item.data.date).getDate()

            newArr[newArr.length-1].push(item)

            if ( arr[i+1] ) {
                const nextDate = new Date(arr[i+1].data.date).getDate() 
                if (date !== nextDate ) {
                    newArr.push([])
                }
            }
            
        })
        return newArr;
    }

    const renderGroups = (arr) => {
        const groups = sortTasks(arr)

        return groups.map( (item,index) => {
            return ( <div className='userpage-tasks-group' key={`group${index}`} >
                <div className="userpage-tasks-date">
                    <div className="userpage-tasks-date-icon"><ClockIcon /></div>
                    {moment(new Date(item[0].data.date) ).format('MM/DD')}
                    </div>
                <div className="userpage-tasks-group-container">
                    {item.map( (groupItem,index) => {
                                console.log(groupItem.data.date)
                                return (
                                <UserTask 
                                key={`task${index}`}
                                data={groupItem}
                                dispatch={dispatch}
                                user={user} />
                            )
                })
                }
                </div>
            </div> )
        })
    }

    if ( err ) return <NotFoundPage err={err} />
    else {
        if (userTasks) {
            return(
                <div className='userpage-tasks-container'>
                    <div className='userpage-header'><MouthIcon width={'1.7px'} color='#444444;' /><span>{userName}'s</span> tasks</div>
                    <div className='userpage-tasks'>
                        {userTasks && userTasks.length > 0 ? renderGroups(userTasks) : <p>No tasks for this user</p>}
                    </div> 
                </div>
                )
        }
        else return <div><Loader /></div>
        
    }
    
}

export default connect(mapStateToProps)(UserPage)