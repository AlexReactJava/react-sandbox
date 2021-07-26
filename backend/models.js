'use strict'
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/testdb')
const GroupSchema = new mongoose.Schema({
  _id: String,
  name: String
})
const Group = mongoose.model('Group', GroupSchema)
const UserSchema = new mongoose.Schema({
  _id: String,
  username: String,
  groupId: String
})
UserSchema.methods.group = function() {
  return Group.findById(this.groupId).exec()
}
const User = mongoose.model('User', UserSchema)

module.exports = { User, Group }