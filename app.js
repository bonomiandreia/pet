const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const url = 'mongodb+srv://admin-deia:maria12345@cluster0-pdbvx.mongodb.net/test?retryWrites=true&w=majority'
const options = {
    reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true
}

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true )

mongoose.connection.on('error', (error) => {
    console.log('error conection' + error)
})

mongoose.connection.on('disconnected', (error) => {
    console.log('disconnected')
})

mongoose.connection.on('connected', (error) => {
    console.log('connected')
})

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());

app.listen(3000);

indexRoute = require('./routes/index');
postListRoute = require('./routes/postlist');
usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/posts', postListRoute);

module.exports = app;