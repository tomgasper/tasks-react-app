import { combineReducers } from 'redux'
import tasks from './tasks'
import taskDetails from './taskDetails'
import user from './user'

export const rootReducer = combineReducers({
    tasks,
    taskDetails,
    user
})