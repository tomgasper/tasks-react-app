const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const checkAuth = require('../middleware/checkAuth')

router.post('/postTask',
    checkAuth,
    taskController.postTask
)

router.post('/getTasks',
    taskController.getTasks
)

router.post('/getTaskDetails',
    taskController.getTaskDetails
)

router.post('/addComment',
    checkAuth,
    taskController.addComment
)

router.post('/getTaskComments',
    taskController.getTaskComments
)

router.post('/upReactionTask',
    taskController.upReaction
)

router.post('/getCommentsNum',
    taskController.getCommentsNum
)

router.post('/deleteTask',
    checkAuth,
    taskController.deleteTask
)

router.post('/comment/addImg',
    taskController.addImg
)

router.post('/getUserTasks',
    taskController.getUserTasks
)

module.exports = router