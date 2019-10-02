import axios from 'axios';
import NodeLogger from 'node-logger';
import CONFIG from '../config';

const logger = NodeLogger.createLogger('./logs/development.log');
const usersRelationalAPIUrl = CONFIG.USERS_RELATIONAL_API_URL;

exports.get = function () {
  return axios({
    method: 'get',
    url: `${ usersRelationalAPIUrl }`
  })
    .then(response => {
      let res = response.data.data;
      logger.info(`Get Users request sent`);
      return res;
    })
    .catch(logger.error);
};

exports.update = function (userId, data) {
  return axios({
    method: 'put',
    url: `${ usersRelationalAPIUrl }/${ userId }`,
    data: data
  })
    .then(response => {
      let res = response.data;
      logger.info(`Update User request sent, id: ${ userId }, data: ${ JSON.stringify(data) }.`);
      return res;
    })
    .catch(logger.error);
};

exports.create = function (data) {
  return axios({
    method: 'post',
    url: `${ usersRelationalAPIUrl }`,
    data: data
  })
    .then(response => {
      let res = response.data;
      logger.info(`Create User request sent, data: ${ JSON.stringify(data) }.`);
      return res;
    })
    .catch(logger.error);
};

exports.delete = function (userId) {
  return axios({
    method: 'post',
    url: `${ usersRelationalAPIUrl }/${ userId }`,
    data: data
  })
    .then(response => {
      let res = response;
      logger.info(`Delete User request sent, id: ${ JSON.stringify(userId) }.`);
      return res;
    })
    .catch(logger.error);
};

exports.search = function (queryParams) {
  return axios({
    method: 'get',
    url: `${ usersRelationalAPIUrl }`,
    params: queryParams
  })
    .then(response => {
      let res = response.data.data;
      logger.info(`Get User request sent, query params: ${ JSON.stringify(queryParams) }.`);
      return res;
    })
    .catch(logger.error);
};
