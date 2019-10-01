import NodeLogger from 'node-logger';
import uuidv1 from 'uuid/v1';
import BrokerClient from '../common/broker/client';
import CONSTANTS from '../common/constants';

const logger = NodeLogger.createLogger('./logs/development.log');

let handleError = function(err, res) {
  if (res)
    res.send({
      status: 'error',
      message: err
    });

  logger.error(err);
};

/**
 * Handle list users actions
 * @param req
 * @param res
 */
exports.index = function (req, res) {

  let query = req.query; //{ $limit:10 };

  models.instance.Kudo.find(query, { allow_filtering: true }, function(err, kudos){
    console.log(query);

    if (err) handleError(err, res);

    res.json({
      status: 'success',
      message: 'Kudos loaded/listed.',
      data: kudos
    });

    logger.info(`Kudos loaded/listed.`);
  });
};

/**
 * Handle create kudo actions
 * @param req
 * @param res
 */
exports.new = function (req, res) {
  let kudo = new models.instance.Kudo({
    id: uuidv1(),
    source : req.body.source,
    target : req.body.target,
    topic : req.body.topic,
    description : req.body.description,
  });

  kudo.save(function (err) {
    if (err) handleError(err, res);

    res.json({
      message: 'New kudo created.',
      data: kudo
    });

    logger.info(`Kudo ${kudo.id} created.`);

    BrokerClient.send({
      model: CONSTANTS.MODELS.KUDO,
      id: kudo.id,
      userId: kudo.target,
      action: CONSTANTS.ACTIONS.CREATE
    });
  });
};

/**
 * Handle view kudo info
 * @param req
 * @param res
 */
exports.view = function (req, res) {
  let kudoId = req.params.kudo_id;
  let query = { id: kudoId };

  models.instance.Kudo.findOne(query, function(err, kudo){
    if (err) handleError(err, res);

    res.json({
      message: 'Kudo details loaded.',
      data: kudo
    });

    logger.info(`Kudo details for ${kudoId} loaded.`);
  });
};

/**
 * Handle update kudo info
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  throw 'Method `KudoController.update` not implemented.';
};

/**
 * Handle delete kudo
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  let kudoId = req.params.kudo_id;
  let query = { id: kudoId };

  models.instance.Kudo.findOne(query, function(err, kudo){
    if (err) handleError(err, res);

    kudo.delete(function (err) {
      if (err) handleError(err, res);

      res.json({
        status: 'success',
        message: 'Kudo deleted'
      });

      logger.info(`Kudo ${kudo.id} deleted.`);

      BrokerClient.send({
        model: CONSTANTS.MODELS.KUDO,
        id: kudo.id,
        userId: kudo.target,
        action: CONSTANTS.ACTIONS.DELETE
      });
    });
  });
};