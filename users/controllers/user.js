let logger = require('node-logger').createLogger('./logs/development.log');

let BrokerClient = require('../broker/client');

let User = require('../models/user');

let USER = 'user';
let ACTIONS = {
  CREATE: 'create',
  DELETE: 'delete',
};

let handleError = function(err, res) {
  if (res)
    res.send({
      status: 'error',
      message: err
    });

  logger.error(err);
};

exports.index = function (req, res, next) {
  const criteria = req.query;
  const hasCriteria = Object.keys(criteria).length;
  console.log('index:criteria', hasCriteria, criteria);

  if (hasCriteria)
    next();
  else
    User.get(function (err, users) {
      if (err) handleError(err, res);

      res.json({
        status: 'success',
        message: 'Users loaded/listed.',
        data: users
      });

      logger.info(`Users loaded/listed.`);
    });
};

/**
 * Handle create user actions
 * @param req
 * @param res
 */
exports.new = function (req, res) {
  let user = new User();
  user.username = req.body.username;
  user.name = req.body.name ? req.body.name : user.name;

  user.save(function (err) {
    if (err) handleError(err, res);

    res.json({
      message: 'New user created.',
      data: user
    });

    logger.info(`User ${user._id} created.`);

    BrokerClient.send({
      model: USER,
      id: user.id,
      action: ACTIONS.CREATE
    });
  });
};

/**
 * Handle view user info
 * @param req
 * @param res
 */
exports.view = function (req, res) {
  let userId = req.params.user_id;

  User.findById(userId, function (err, user) {
    if (err) handleError(err, res);

    res.json({
      message: 'User details loaded.',
      data: user
    });

    logger.info(`User details for ${userId} loaded.`);
  });
};

/**
 * Handle update user info
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  let userId = req.params.user_id;

  User.findById(userId, function (err, user) {
    if (err) return handleError(err, res);
    if (!user) return handleError(`User not found with id: ${userId}`, res);

    user.name = req.body.name ? req.body.name : user.name;
    user.username = req.body.username ? req.body.username : user.username;
    user.kudosQty = req.body.kudosQty ? req.body.kudosQty : user.kudosQty;

    user.save(function (err) {
      if (err) handleError(err, res);

      res.json({
        message: 'User updated.',
        data: user
      });
    });

    logger.info(`User ${userId} updated.`);
  });
};

/**
 * Handle delete user
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  let userId = req.params.user_id;

  User.remove({ _id: userId }, function (err, user) {
    if (err) handleError(err, res);

    res.json({
      status: 'success',
      message: `User deleted.`
    });

    logger.info(`User ${userId} deleted.`);

    BrokerClient.send({
      model: USER,
      id: userId,
      action: ACTIONS.DELETE
    });
  });
};

/**
 * Handle search user
 * @param req
 * @param res
 */
exports.search = function (req, res) {
  const criteria = req.query;
  const hasCriteria = Object.keys(criteria).length;
  console.log('search:criteria', hasCriteria, criteria);

  if (hasCriteria)
    User.search({ query_string: criteria }, function (err, users) {
      if (err) handleError(err, res);

      res.json({
        status: 'success',
        message: 'Users searched.',
        data: users
      });

      console.log('Yesy!', users);

      logger.info(`Users search done, criteria: ${ JSON.stringify(criteria) }.`);
    });
};


