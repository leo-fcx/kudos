# kudos
## Topology ad Technologies

![alt text](https://raw.githubusercontent.com/leo-fcx/kudos/master/images/diagram.png)


## How to Run?

#### Users API

To start Users API, run:

```
cd users
npm install
USER=user PASS=pwd npm run start
```
This is going to start the Users REST API at: `http:8080//localhost/api/users`
Where `user` and `pwd` are credentials for RabbitMQ instance.

#### Kudos API

To start Kudos API, run:

```
cd kudos
npm install
USER=user PASS=pwd npm run start
```
This is going to start the Users REST API at: `http:9090//localhost/api/kudos`
Where `user` and `pwd` are credentials for RabbitMQ instance.

#### STATS service

To start STATS service, run:

```
cd stats
npm install
USER=user PASS=pwd npm run start
```
This is going to start the Users REST API at: `http:9090//localhost/api/users`
Where `user` and `pwd` are credentials for RabbitMQ instance.

## How to test?

#### Create users

To create 20 test users, run: 

```
cd stats
babel-node seeds/users.js 20
```
#### Create kudos

To create 20 kudos for randomly selected users, run: 

```
cd stats
babel-node seeds/kudos.js 20
```
NOTE: Kudos are create with some delays. This allows to test the scenario where kudos are being created and from other side, Users info are retrieved. These may be some test steps:

1. Create test users, let's say 50: `babel-node seeds/users.js 50`
2. Open postman to get users list: `GET http:8080//localhost/api/users`
3. Create several kudos, let's say 200: `babel-node seeds/kudos.js 200` 
4. Run step 2 consecutevily to check that the `kudosQty` for each user is "eventually" updated. 
