const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = new Schema({
    name: {},
    password: String,
    email:String,
    id: ObjectId,
    about: String
}, { collection:'users' }
)

const Task = new Schema({
    body: {},
    creatorId: String,
    author: String,
    date: String,
    id: ObjectId,
    reactions: {
        reaction1: Number,
        reaction2: Number,
        reaction3: Number,
        reaction4: Number
    }
}, { collection:'tasks' } )

const TaskComments = new Schema({
    id: ObjectId,
    taskId: String,
    body: String,
    author: String,
    date: String,
    creatorId: String,
}, { collection:'taskComments' } )

const Models = {
    Users: mongoose.model('Users', User),
    Tasks: mongoose.model('Tasks', Task),
    TaskComments: mongoose.model('TasksComments', TaskComments)
};

module.exports = Models