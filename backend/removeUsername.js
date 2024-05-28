const mongoose = require('mongoose');

mongoose.connect('your_mongo_db_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', async () => {
  console.log('Connected to MongoDB');
  
  // Drop the unique index on the username field
  await connection.collection('users').dropIndex('username_1');
  
  console.log('Dropped unique index on username field');
  connection.close();
});