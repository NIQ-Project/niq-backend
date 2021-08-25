// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for tasks
const Task = require('../models/task')
const List = require('../models/list')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { task: { title: '', text: 'foo' } } -> { task: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /tasks
router.post('/tasks/:id', requireToken, (req, res, next) => {
  // find the list we're going add the task to
  List.findById(req.params.id)
    .then(list => {
      list.tasks.push({
        item: req.body.task.item,
        owner: req.params.id,
        done: req.body.task.done
      })

      return list.save()
    })
    // respond to successful `create` with status 201 and JSON of new "task"
    .then(list => res.status(201).json({ list: list.toObject() }))
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// SHOW
// GET /tasks/5a7db6c74d55bc51bdf39793/e13l1420995bc51bdf39793
router.get('/tasks/:id/:taskId', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    .then(list => list.tasks.id(req.params.taskId))
    .then(task => res.status(200).json({ task: task.toObject() })) 
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /tasks/5a7db6c74d55bc51bdf39793
router.patch('/tasks/:id/taskId', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.task.owner

  List.findById(req.params.id)
    .then(handle404)
    .then(list => list.tasks.id(req.params.taskId))
    .then(task => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, task)

      // pass the result of Mongoose's `.update` to the next `.then`
      return task.updateOne(req.body.task)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /tasks/5a7db6c74d55bc51bdf39793
router.delete('/tasks/:id/:taskId', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    // The
    .then(list => {
      list.tasks.pull(req.params.taskId)
      list.save()
      return list
    })
    .then(list => console.log('deleted', list.tasks.toJSON()))
    
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
