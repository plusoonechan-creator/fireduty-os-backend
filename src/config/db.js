const dns = require('dns');
const mongoose = require('mongoose');

// Windows' default DNS resolver sometimes fails on the SRV lookup Atlas connection
// strings rely on; pointing Node at public resolvers works around that.
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and fill in your Atlas connection string.');
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected:', mongoose.connection.name);
}

module.exports = connectDB;
