const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const promisedDBConnection = () => {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('connection error:')
      reject(db)
    });
    db.once('open', function() {
      // we're connected!
      resolve(db)
    });
  })
}

module.exports = {
  promisedDBConnection,
}