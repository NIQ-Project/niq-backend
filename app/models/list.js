/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const User = require('./user')
const taskSchema = require('./task')

const listSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tasks: [taskSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('List', listSchema)
