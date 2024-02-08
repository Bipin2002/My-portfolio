
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

module.exports = {
  User,
  Project,
  Blog,
  Work,
  Achievement,
};
