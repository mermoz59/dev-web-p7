const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const connectionString = 'mongodb+srv://aminetouba59:Altqlmj1qiEY9Nmh@dev-web-p7.5flpr4n.mongodb.net/?retryWrites=true&w=majority';
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book')

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(error => console.log('Connexion à MongoDB échouée !', error));


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;