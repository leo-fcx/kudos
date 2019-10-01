import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes';
import db from './models';

// let BrokerClient = require('./broker/client');

// BrokerClient.init();

let app = express();
let port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to Users Relational API.'));

// Use Api routes in the App
app.use('/api', apiRoutes);

db.sequelize.sync().then(() => {
// Launch app to listen to specified port
  app.listen(port, function () {
    console.log('**********************************************************');
    console.log('');
    console.log('     KUDOS App: Running Users Relational API on port:' + port);
    console.log('');
    console.log('**********************************************************');
  });
});
