let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require('./apiRoutes');
let BrokerClient = require('./broker/client');

BrokerClient.init();

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true });

let app = express();
let db = mongoose.connection;
let port = process.env.PORT || 8080;

if (!db)
  console.log('Error connecting DB.');
else
  console.log('DB connected successfully.');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to Users API.'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log('**********************************************************');
  console.log('');
  console.log('     KUDOS App: Running Users API on port:' + port);
  console.log('');
  console.log('**********************************************************');
});
