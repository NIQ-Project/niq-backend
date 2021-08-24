/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const List = require('./list')

const taskSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true
  }
}, {
  timestamps: true
})

module.exports = taskSchema
