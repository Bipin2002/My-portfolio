
const mongoose = require('./db');
const { model, Schema } =require('mongoose');


const User = model('Users', {
  username: String,
  email: String,
  password: String,
});

const Project = model('Project', {
  name: {type: String, required: true,},
  image: {type: String, required: true,},
  description: {type: String,required: true,},
  url: {type: String,},
});

const Blog = model('Blog', {
  name: {type: String, required: true,},
  image: {type: String, required: true,},
  description: {type: String,required: true,},
  url: {type: String,},
});
const Work = model('Work', {
  name: {type: String, required: true,},
  image: {type: String, required: true,},
  description: {type: String,required: true,},
});

const Achievement = model('Achievements', {
  name: {type: String, required: true,},
  image: {type: String, required: true,},
  date: {type: String},
});

const PersonalData = model('personaldatas', {
  image: {type: String, required: true,},
  firstname: {type: String, required: true,},
  lastname: {type: String, required: true,},
  designation: {type: String, required: true,},
  email: {type: String, required: true,},
  summary: {type: String, required: true,},
  contact: {type: String, required: true,},
  address: {type: String, required: true,},
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = {
  User,
  Project,
  Blog,
  Work,
  Achievement,
  PersonalData
};
