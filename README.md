# kudos
## Topology ad Technologies

![alt text](https://raw.githubusercontent.com/leo-fcx/kudos/master/images/diagram.png)

## Pre-requisites

Have following servers up and running in local/same machine. Please note that we use default or none credentials for them.

#### RabbitMQ Management server

Run following commands:
```
docker pull rabbitmq:3.6-management
docker run -d --hostname my-rabbit --name kudos-rabbit -p 5672:5672 -p 9999:15672 rabbitmq:3.6-management
```
The servershould be running at `http://localhost:9042`

#### Cassandra DB server

Run following commands:
```
docker pull cassandra
docker run --name kudos-cassandra -p 9042:9042 -d cassandra
```
The servershould be running at `http://localhost:9999` and credentials are: `guest/guest`

#### ElasticSearch server

Run following commands:
```
docker pull elasticsearch:7.3.2
docker run -d --name kudos-elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.3.2
```
The servershould be running at `http://localhost:9200`

#### Check
To confirm that all servers are up and running, run `docker ps -a` which will output somethin like the following:
```
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS              PORTS                                                                                       NAMES
b411589f9b52        elasticsearch:7.3.2       "/usr/local/bin/dock…"   2 hours ago         Up 2 hours          0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp                                              kudos-elasticsearch
88d05181695d        rabbitmq:3.6-management   "docker-entrypoint.s…"   2 days ago          Up 2 days           4369/tcp, 5671/tcp, 15671/tcp, 25672/tcp, 0.0.0.0:5672->5672/tcp, 0.0.0.0:9999->15672/tcp   kudos-rabbit
d8f34ec00362        cassandra                 "docker-entrypoint.s…"   2 days ago          Up 2 days           7000-7001/tcp, 7199/tcp, 9160/tcp, 0.0.0.0:9042->9042/tcp                                   kudos-cassandra
leofcx@Leos-MacBook-Pro users (master) $
```

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
