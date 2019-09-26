import NodeLogger from 'node-logger';
import KudoService from '../services/kudo';

const logger = NodeLogger.createLogger('./logs/development.log');
const CONSTANTS = require('../constants');

class UserConsumer {
  constructor() {
    logger.info(`Initializing User consumer.`);
  }

  consume(model) {
    logger.info(`Consuming Kudo data: ${ model }`);

    switch (model.action) {
      case CONSTANTS.ACTIONS.CREATE: return this.handleUserCreated(model.id);
      case CONSTANTS.ACTIONS.DELETE: return this.handleUserDeleted(model.id);
    }
  }

  /**
   * Do not do anything.
   * @param userId
   * @return {Promise<boolean>}
   */
  handleUserCreated(userId) {
    logger.info(`Handling User created ${userId}`);
    return Promise.resolve(true);
  }

  /**
   * Delete all KUDOS from the user.
   * @param userId
   * @return {Promise<T | never>}
   */
  handleUserDeleted(userId) {
    logger.info(`Handling User deleted ${userId}`);

    return KudoService
      .get({ target: userId })
      .then(response => response.forEach(kudo => KudoService.delete(kudo.id)))
      .catch(logger.error);
  }
}

module.exports = UserConsumer;