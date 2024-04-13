const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); 
const {Client} = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

//Creates our client
const client = new Client({
  user: 'postgres',
  password: 'admin',          //Will have to change the values of these attributes to suit your own system when testing
  host: 'localhost',
  port: 5432,
  database: 'ProjectV2'
})

//Connects server to PostgreSQL database
client.connect()
  .then(() => console.log('Connection to PostgreSQL database successful...'))
  .catch(() => console.error('Connection Error:', err.stack));

//Middleware
app.use(express.static(__dirname + '/public')); //static server
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

app.use((request, response, next) => {
  request.app.locals.client = client;
  next();
});
app.use('/', routes);

//Starts server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server started on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/logpage`)
    console.log(`http://localhost:3000/logreg.html`)
  }
})