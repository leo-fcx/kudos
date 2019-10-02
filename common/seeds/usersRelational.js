import faker from 'faker';
import UserRelationalService from '../services/userRelational';

const total = process.argv[2] || 10;

console.log(`Creating ${total} users:`);

for(let i = 0; i < total; i++) {
  let name = faker.name.findName();
  let username = name.split(' ')[0].toLowerCase();

  UserRelationalService
    .create({ username, name })
    .then(user => console.log(` -> User ${ i }: ${ JSON.stringify(user) }`));
}
