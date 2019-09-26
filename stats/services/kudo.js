import axios from 'axios';
import NodeLogger from 'node-logger';

const logger = NodeLogger.createLogger('./logs/development.log');
const kudosAPIUrl = 'http://localhost:9090/api/kudos';

exports.get = function (queryParams) {
  return axios({
    method: 'get',
    url: `${ kudosAPIUrl }`,
    params: queryParams
  })
    .then(response => {
      let res = response.data.data;
      logger.info(`Get Kudo request sent, query params: ${ JSON.stringify(queryParams) }.`);
      return res;
    })
    .catch(logger.error);
};

exports.create = function (data) {
  return axios({
    method: 'post',
    url: `${ kudosAPIUrl }`,
    data: data
  })
    .then(response => {
      let res = response.data.data;
      logger.info(`Create Kudo request sent, data: ${ JSON.stringify(data) }.`);
      return res;
    })
    .catch(logger.error);
};

exports.delete = function (kudoId) {
  return axios({
    method: 'delete',
    url: `${ kudosAPIUrl }/${ kudoId }`
  })
    .then(response => {
      let res = response.data.data;
      logger.info(`Delete Kudo request sent, id: ${ JSON.stringify(kudoId) }.`);
      return res;
    })
    .catch(logger.error);
};

