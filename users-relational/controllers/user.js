import uuidv1 from 'uuid/v1';
import NodeLogger from 'node-logger';

const db = require('../models');
// let BrokerClient = require('../broker/client');

const logger = NodeLogger.createLogger('./logs/development.log');

// let USER = 'user';
// let ACTIONS = {
//   CREATE: 'create',
//   DELETE: 'delete',
// };

let handleError = (err, res) => {
  if (res)
    res.send({
      status: 'error',
      message: err
    });

  logger.error(err);
};

exports.index = (req, res, next) => {
  const criteria = req.query;
  const hasCriteria = Object.keys(criteria).length;

  if (hasCriteria)
    next();
  else
    db.user
      .findAll()
      .then((users) => {
        res.json({
          status: 'success',
          message: 'Users loaded/listed.',
          data: users
        });

        logger.info(`Users loaded/listed.`);
      })
      .catch((err) => handleError(err, res));
};

/**
 * Handle create user actions
 * @param req
 * @param res
 */
exports.new = (req, res) => {
  db.user
    .create({
      id: uuidv1(),
      username: req.body.username,
      name: req.body.name
    })
    .then((user) => {
      res.json({
        message: 'New user created.',
        data: user
      });

      logger.info(`User ${user.id} created.`);
    })
    .catch((err) => handleError(err, res));
};

/**
 * Handle view user info
 * @param req
 * @param res
 */
exports.view = (req, res) => {
  let userId = req.params.user_id;

  db.user
    .findByPk(userId)
    .then((user) => {
      res.json({
        message: 'User details loaded.',
        data: user
      });

      logger.info(`User details for ${userId} loaded.`);
    })
    .catch((err) => handleError(err, res));
};

/**
 * Handle update user info
 * @param req
 * @param res
 */
exports.update = (req, res) => {
  let userId = req.params.user_id;

  db.user
    .update({
      username: req.body.username,
      name: req.body.name,
      kudosQty: req.body.kudosQty
    }, {
      where: { id: userId} })
    .then( (user) => {
      res.json({
        message: 'User updated.',
        data: user
      });

      logger.info(`User ${userId} updated.`);
    })
    .catch((err) => handleError(err, res));
};

/**
 * Handle delete user
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
  let userId = req.params.user_id;

  db.user
    .destroy({ where: { id: userId } })
    .then(() => {
      res.json({
        status: 'success',
        message: `User deleted.`
      });

      logger.info(`User ${userId} deleted.`);
    })
    .catch((err) => handleError(err, res));
};

/**
 * Handle search user
 * @param req
 * @param res
 */
exports.search = (req, res) => {
  // const criteria = req.query;
  // const hasCriteria = Object.keys(criteria).length;
  // console.log('search:criteria', hasCriteria, criteria);
  //
  // if (hasCriteria)
  //   User.search({ query_string: criteria }, function (err, users) {
  //     if (err) handleError(err, res);
  //
  //     res.json({
  //       status: 'success',
  //       message: 'Users searched.',
  //       data: users
  //     });
  //
  //     console.log('Yesy!', users);
  //
  //     logger.info(`Users search done, criteria: ${ JSON.stringify(criteria) }.`);
  //   });
};


