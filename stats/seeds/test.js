import KudoService from '../services/kudo';
import UserService from '../services/user';

let kudoCriteria = { target: '5d8cccdea2abd0e2a1ab420b' };

KudoService
  .get(kudoCriteria)
  .then(function(response) {
    console.log('');
    console.log('--------------------------------------------------------------------------------');
    console.log(`Retrieving KUDOS, criteria: ${ JSON.stringify(kudoCriteria) }`);
    response.map((item)=> console.log(` -> KUDO: ${ JSON.stringify(item) }`) );
  });

let userCriteria = { query: 'ray' };

UserService
  .search(userCriteria)
  .then(function(response) {
    console.log('');
    console.log('--------------------------------------------------------------------------------');
    console.log(`Retrieving USERS, criteria: ${ JSON.stringify(userCriteria) }`);
    response.hits.hits.map((item)=> console.log(` -> USER: ${ JSON.stringify(item) }`) );
  });