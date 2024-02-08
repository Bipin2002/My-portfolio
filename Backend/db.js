
const {mongoose , connect } = require('mongoose');


connect('mongodb://localhost:27017/auth-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
});

module.exports = mongoose;
