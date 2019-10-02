import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import apiRoutes from './routes';

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true });

let app = express();
let db = mongoose.connection;
let port = process.env.PORT || 8080;

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

if (!db)
  console.log('Error connecting DB.');
else
  console.log('DB connected successfully.');
