const {Client} = require('pg')

//Creates our client
const client = new Client({
  user: 'postgres',
  password: 'admin',          //Will have to change the values of these attributes to suit your own system when testing
  host: 'localhost',
  port: 5432,
  database: 'ProjectV2'
})

//Connects the client to our server
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected successfully...");
});
/*client.connect()
.then(() => console.log("Connected successfully..."))
.catch(e => console.log)
.finally(() => client.end())*/

