Simple Tour Booking API
================================

This small API built on Node, TypeScript and using MongoDB (NoSQL)

## Prerequisites
-------------------
Before you start, make sure you have created a database on MongoDB Atlas. 
If you don't have an account, please follow the link to create one [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Once you have created a database and a user, update environment file configuration - `mongoAtlas`
> `config/enviroment.yaml`

1. Install dependence

	```bash
	# yarn install OR # npm install
	```
 
2. Run the migration to create collections
   
   Replace `{name}` with available collections `(user, user_proxy, session, operator, tour)`
	```bash
	# ./node_modules/.bin/ts-node commands/migrations/create-collection-{name}.ts 
	```
    
    > You will see collections created in the dashboard under collections tab

2. Run development server

	```bash
	# yarn server:watch
	```
 
3. Run test
 
 	```bash
 	# yarn test
 	```


## How to test API
---------------
For the testing purposes, made a list of endpoints you can on your preferred client. 
There are two types of storage used `MongoDB and InMemory store`. To test using `InMemory store` is very
straight forward. You just need to change one line of code and then you are good to go. 

> NOTE: MongoDB is used as a default storage, to switch to InMemory store, make changes on
> [storage.service.ts](src/services/storage/storage.service.ts) on line 22 to `InMemoryStorage()`.

List of endpoint: [Endpoints](docs/endpoints.md)



Please don't forget to follow me on [twitter](https://twitter.com/timmoraja)

Thanks!

License
======================
The MIT License (MIT).
