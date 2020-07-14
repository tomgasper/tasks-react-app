import React from 'react'
import { connect } from 'react-redux'
import Task from '../../components/Task/Task'

const mapStateToProps = (state) => ({
    user:state.user.name,
    recentTasks: state.tasks.recent,
    tasksLoading: state.tasks,
    isAddTaskWindow: state.tasks.isAddTaskWindow
})

const Tasks = ({user,recentTasks,tasksLoading,isAddTaskWindow,dispatch }) => {
    return(
    <div className='homescreen-tasks' style={{opacity: isAddTaskWindow ? 0.3 : 1}}>
        { recentTasks ? recentTasks.map( item => <Task dispatch={dispatch} data={item} user={user} />)
        : <div className='homescreen-placeholder' >No recent tasks</div> }
    </div>
    )
}

export default connect(mapStateToProps)(Tasks)