let express = require('express');
let bodyParser = require('body-parser');
let models = require('express-cassandra');

let apiRoutes = require('./routes');
let BrokerClient = require('./broker/client');

BrokerClient.init();

models.setDirectory( __dirname + '/models').bind({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'kudos',
    queryOptions: { consistency: models.consistencies.one },

    // elasticsearch: {
    //   host: 'http://localhost:9200',
    //   apiVersion: '7.2',
    //   sniffOnStart: true
    // }
  },
  ormOptions: {
    defaultReplicationStrategy : {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe'
  },

  // ormOptions: {
  //   // omitted other options for clarity
  //   defaultReplicationStrategy: {
  //     class: 'NetworkTopologyStrategy',
  //     DC1: 1
  //   },
  //   migration: 'alter',
  //   manageESIndex: true
  // }
}, function(err) {
  if (err) {
    console.log('Error connecting DB.');
    throw err;
  }

  console.log('DB connected successfully.');

  // TODO: Avoid using global to store reference to models
  global.models = models;
});

let app = express();
let port = process.env.PORT || 9090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to Kudos API.'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log('**********************************************************');
  console.log('');
  console.log('     KUDOS App: Running Kudos API on port:' + port);
  console.log('');
  console.log('**********************************************************');
});
