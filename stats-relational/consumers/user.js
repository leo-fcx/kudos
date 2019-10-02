import NodeLogger from 'node-logger';
import CONSTANTS from '../common/constants';

const logger = NodeLogger.createLogger('./logs/development.log');

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

    const result = models.instance.Kudo.find({ target: userId }, { allow_filtering: true },function(err, kudos){
      if (err) return logger.error(err);

      kudos.forEach(kudo => {
        logger.info(`Deleting kudo: ${ kudo.id }`);
        kudo.delete();
      });
    });

    return Promise.resolve(result);
  }
}

module.exports = UserConsumer;