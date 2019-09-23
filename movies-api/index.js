const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js')

const {logErrors,errorHandler,wrapErrors} =require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

app.use(express.json())


moviesApi(app)

app.use(notFoundHandler)

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

// app.get('/', function(req, res) {
//   res.send('hello world');
// });

// app.get('/json', function(req, res) {
//   res.json({ hello: 'world' });
// });


app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});