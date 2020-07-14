import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { getTasks } from '../../handlers/taskHandlers'

import Tasks from './Tasks'

import notepad from '../../img/Icons/notepad.json'
import HeaderIcon from '../../img/Icons/HeaderIcon'
import SubmitTask from '../../components/Form/SubmitTask'
import Loader from '../../img/Loader/Loader'

const mapStateToProps = (state) => ({
    user: state.user.name,
    recentTasks: state.tasks.recent,
    shouldRefresh: state.tasks.shouldRefresh,
    tasksLoading: state.tasks.isLoading,
    isAddTaskWindow: state.tasks.isAddTaskWindow
    
})

const Homescreen = ({ dispatch, shouldRefresh,tasksLoading, isAddTaskWindow }) => {
    useEffect( () => {
        dispatch( getTasks() )
    }, [] )

    useEffect( () => {
        if (shouldRefresh === true) dispatch( getTasks() )
    }, [shouldRefresh] )

    return(
        <div className='homescreen-container'>
            <div className='homescreen-header'>
            <div className='homescreen-header-icon'>
            <HeaderIcon height={150} width={200} data={notepad} /> 
            </div>
                {isAddTaskWindow ? <div className='homescreen-header-text' >new </div> : <div className='homescreen-header-text' > recent </div>}
            </div>
             { isAddTaskWindow ? <SubmitTask /> : null } 
            { tasksLoading ? <Loader /> : <Tasks /> }
        </div>  
    )
}

export default connect(mapStateToProps)(Homescreen)