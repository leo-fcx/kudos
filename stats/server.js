import NodeLogger from 'node-logger';
import BrokerClient from './common/broker/client';
import UserConsumer from './consumers/user';
import KudoConsumer from './consumers/kudo';
import CONSTANTS from './common/constants';

const logger = NodeLogger.createLogger('./logs/development.log');
const kudoConsumer = new KudoConsumer(logger);
const userConsumer = new UserConsumer(logger);

console.log('**********************************************************');
console.log('');
console.log('     KUDOS App: Running Stats service.');
console.log('');
console.log('**********************************************************');

BrokerClient.consume((msg, channel) => {
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






