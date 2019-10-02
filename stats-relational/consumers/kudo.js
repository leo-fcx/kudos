import NodeLogger from 'node-logger';
import CONSTANTS from '../common/constants';
import db from "../../users-relational/models";

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

    const result = models.instance.Kudo.find({ target : userId }, { allow_filtering: true }, function(err, kudos){
      if (err) return logger.error(err);

      return db.user
        .update({ kudosQty: kudos.length }, { where: { id: userId} })
        .then( () => logger.info(`User ${userId} updated.`))
        .catch(() => logger.error);
    });

    return Promise.resolve(result);
  }
}

module.exports = KudoConsumer;