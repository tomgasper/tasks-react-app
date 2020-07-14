const Models = require('../models/Models')
const jwt = require('jsonwebtoken')
const config = require('../config')

const cloudinary = require('cloudinary').v2

module.exports = {
    postTask: (req,res) => {
        const user = res.locals.user
        console.log(user)
        console.log(req.body)

        Models.Users.findOne( { name: user }, (err,result) => {
            if (err) console.log(err) //FIX

            user_id = result._id
            const newTask = new Models.Tasks({
                body: req.body.data,
                creatorId: user_id,
                author: user,
                date: new Date(),
                reactions: {
                    reaction1: 0,
                    reaction2: 0,
                    reaction3: 0,
                    reaction4: 0,
                }
            })

            newTask.save( (err,response) => {
                if (err) console.log(err) // FIX
                console.log(response)
                res.status(200).json(response._id)
            })

        })
    },
    deleteTask: (req,res) => {
        const user = res.locals.user
        const taskAuthor = req.body.data
        const taskId = req.body.id

        if ( user === taskAuthor ) {
            Models.Tasks.deleteOne({_id: taskId}, (err, response) => {
                if (err) res.status(400).json(err)
                    Models.TaskComments.deleteMany( {taskId: taskId} , (err,response) => {
                        if (err) res.status(400).json(err)
                        console.log(response)
                        res.status(200).json('DELETED COMMENTS')
                    })
            })
            
        }
        else res.status(400).json('You dont have permission to perform this action')
        
    },
    getTasks: (req,res) => {
        Models.Tasks.find({}).sort( ( {_id: -1} )).exec( (err,docs) => {
            if (err) res.status(400).json(err)
            const tasks = docs.map( item => {
                return {data: item}
            })

            const detailedTasks = docs.map( task => {
                    return Models.TaskComments.countDocuments({
                    'taskId':  task._id }).then( res => {
                        return {
                            data: { ...task._doc, commentsCount: res }
                        }
                    })
            })

            Promise.all(detailedTasks)
            .then( result => res.status(200).json(result) )
            .catch( (err) => res.status(400).json(err) )

            // console.log(detailedTasks)

            // res.status(200).json(tasks)
        })
    },
    getUserTasks: (req,res) => {
        const username = req.body.data

        Models.Users.findOne({ name: username }, (err,result) => {
            if (err) res.status(400).json("Server error, please try again")
            if (!result) res.status(400).json("Page not found")
            else {
                Models.Tasks.find({author:username }, (err,docs) => {
                    if (err) res.status(400).json('user not found')
                    const tasks = docs.map( item => {
                        return { data:item }
                    })
        
                    res.status(200).json(tasks)
                })
            }
        }
        )
        
    },
    getTaskDetails: (req,res) => {
        Models.Tasks.findOne({'_id': req.body.id}, (err, result) => {
            if (err) res.status(400).json(err)
            res.status(200).json(result)
        })
    },
    getTaskComments: (req,res) => {
        Models.TaskComments.find({
            'taskId':  req.body.id }, (err, result) => {
            if (err) res.status(400).json(err)
            console.log(result)
            res.status(200).json(result)
        })
    },
    getCommentsNum: (req,res) => {
        Models.TaskComments.countDocuments({
            'taskId':  req.body.id }, (err, result) => {
            if (err) res.status(400).json(err)
            res.status(200).json(result)
        })
    },
    addComment: (req,res) => {
        const taskId = req.body.id
        const commentData = req.body.data
        const user = res.locals.user 

        const newComment = new Models.TaskComments({
            body: commentData,
            taskId: taskId,
            author: user,
            date: new Date()
        })

        newComment.save( (err,result) => {
            if (err) res.status(400).json(err)
            console.log('saved in DB :)')
            console.log(result)
            res.status(200).json('added to db')
        })

    },
    upReaction: (req,res) => {
        const user = res.locals.user 
        const taskId = req.body.id
        const reactionType = 'reactions.' + req.body.data

        console.log(taskId)

        Models.Tasks.findOneAndUpdate( {'_id': taskId }, { $inc: { [reactionType]: 1 } }, { returnOriginal: false }, (err, result) => {
            if (err) res.status(400).json(err)

            res.status(200).json(result)
        })
        },
    addImg: (req,res) => {
        const file = req.body.data
        const filename = req.body.name

        console.log(file)

        cloudinary.uploader.upload( file, {
            'public_id': filename
        } , (err,obj) => {
            console.log(obj)
            if (err) res.status(400).json(err)
            res.status(200).json(obj)
        })
    }
}