import NodeLogger from 'node-logger';
import KudoService from '../common/services/kudo';
import UserService from '../common/services/user';
import CONSTANTS from '../common/constants';

const logger = NodeLogger.createLogger('./logs/development.log');

class KudoConsumer {
  constructor() {
    logger.info(`Initializing Kudo consumer.`);
  }

  consume(model) {
    logger.info(`Consuming Kudo data: ${ JSON.stringify(model) }`);

    switch (model.action) {
      case CONSTANTS.ACTIONS.CREATE:
        logger.info(`Handling Kudo (${model.id}) created for User (${model.userId})`);
        return this.handleKudoQtyChanged(model.id, model.userId);
      case CONSTANTS.ACTIONS.DELETE:
        logger.info(`Handling Kudo (${model.id}) deleted for User (${model.userId})`);
        return this.handleKudoQtyChanged(model.id, model.userId);
    }
  }

  /**
   * Increment Kudos Quantity for the User
   * @param kudoId
   * @param userId
   * @return {Promise<T | never>}
   */
  handleKudoQtyChanged(kudoId, userId) {
    logger.info(`Handling Kudo Qty changed, kudo: ${ kudoId }, user: ${ userId }`);
    return KudoService
      .get({ target: userId })
      .then(response => UserService.update(userId, { kudosQty: response.length }))
      .catch(logger.error);
  }
}

module.exports = KudoConsumer;