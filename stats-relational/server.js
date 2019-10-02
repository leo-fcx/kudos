import NodeLogger from 'node-logger';
import models from 'express-cassandra';
import BrokerClient from './common/broker/client';
import UserConsumer from './consumers/user';
import KudoConsumer from './consumers/kudo';
import CONSTANTS from './common/constants';
import db from "../users-relational/models";

const logger = NodeLogger.createLogger('./logs/development.log');
const kudoConsumer = new KudoConsumer(logger);
const userConsumer = new UserConsumer(logger);
const brokerClient = new BrokerClient(CONSTANTS.QUEUES.KUDOS_RELATIONAL);

models.setDirectory( __dirname + '/models/kudos').bind({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'kudos',
    queryOptions: { consistency: models.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy : {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe'
  }
}, function(err) {
  if (err) {
    console.log('Error connecting DB.');
    throw err;
  }

  console.log('DB connected successfully.');

  // TODO: Avoid using global to store reference to models
  global.models = models;

  db.sequelize.sync().then(() => {
    console.log('**********************************************************');
    console.log('');
    console.log('     KUDOS App: Running Stats Relational service.');
    console.log('');
    console.log('**********************************************************');

    brokerClient.consume((msg, channel) => {
      if (msg === null) return;

      let consumer;
      const data = msg.content.toString();
      const model = JSON.parse(data);

      logger.info(`Message received to consume: ${data}.`);

      switch (model.model) {
        case CONSTANTS.MODELS.KUDO: consumer = kudoConsumer; break;
        case CONSTANTS.MODELS.USER: consumer = userConsumer; break;
      }

      consumer
        .consume(model)
        .then(() => channel.ack(msg) )
        .catch(logger.error);
    });
  });

});







