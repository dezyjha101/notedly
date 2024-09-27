const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
module.exports = {
  connect: (DB_HOST) => {
    // Connect to the database with Mongoose
    mongoose.connect(DB_HOST, {
      useNewUrlParser: true, // Optional as of Mongoose 6, but still useful for legacy code compatibility
      useUnifiedTopology: true, // Ensures the new server discovery and monitoring engine is used
    });

    // Log an error if the connection fails
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      console.log('Please make sure MongoDB is running.');
      process.exit(1);
    });

    // Log a success message once the connection is established
    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB successfully.');
    });
  },

  close: () => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed.');
    });
  }
};
