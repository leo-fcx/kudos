import NodeLogger from 'node-logger';
import amqp from 'amqplib';

const logger = NodeLogger.createLogger('./logs/development.log');

const getChannel = (key, cb) => {
  return amqp
    .connect(`amqp://${process.env.USER}:${process.env.PASS}@0.0.0.0:5672`)
    .then((connection) => {
      logger.info('RabbitMQ client opened connection.');
      return connection.createChannel();
    })
    .then((channel) => {
      logger.info('RabbitMQ client created channel.');
      return channel
        .assertQueue(key)
        .then(() => {
          logger.info(`RabbitMQ client is using channel: ${ key }`);
          cb(channel);
        });
    })
    .catch(console.warn);
};

class BrokerClient {
  constructor(key){
    this.key = key;
  }

  init() {
    getChannel(this.key,channel => this.channel = channel);
  }

  send(data) {
    this.channel.sendToQueue(this.key, Buffer.from(JSON.stringify(data)));
  }

  consume(cb) {
    if (this.isConsumerInitialized) return;

    getChannel(this.key, (channel) => {
      this.channel = channel;
      this.channel.consume(this.key, (msg) => cb(msg, channel));
    });

    this.isConsumerInitialized = true;
  }
}

module.exports = BrokerClient;
