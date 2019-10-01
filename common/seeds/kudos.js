import faker from 'faker';
import uuidv1 from 'uuid/v1';
import UserService from '../services/user';
import KudoService from '../services/kudo';

const totalKudos = process.argv[2] || 10;

UserService
  .get()
  .then((response) => {
    let totalUsers = response.length;

    console.log(`Creating ${totalKudos} kudos:`);

    for (let i = 0; i < totalKudos; i++) {

      let sourceUser;
      let targetUser;
      let indexSourceUser;
      let indexTargetUser;

      do {
        indexSourceUser = Math.floor(Math.random() * totalUsers);
        indexTargetUser = Math.floor(Math.random() * totalUsers);
      } while(indexTargetUser === indexSourceUser);

      sourceUser = response[indexSourceUser];
      targetUser = response[indexTargetUser];

      setTimeout(() => {
        KudoService
          .create({
            id: uuidv1(),
            source : sourceUser._id,
            target : targetUser._id,
            topic : faker.commerce.productAdjective(),
            description : faker.lorem.sentence(),
            created : Date.now()
          })
          .then(kudo => console.log(` -> Kudo created: ${ JSON.stringify(kudo) }`));
      }, 500 * i)
    }
  });
