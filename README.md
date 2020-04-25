Simple Tour Booking API
================================

This small API built on Node, TypeScript and using MongoDB (NoSQL)

Prerequisites
-------------------

Before you start, make sure you have created a database on MongoDB Atlas. 
If you don't have an account, please follow the link to create one [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

* [MongoDB](https://www.mongodb.com)
* [Node.js 13+](https://nodejs.org/en/)
* Command Line Tools
* OS (Mac OS X / Windows / Linux)


Getting Started
------------------

1. The easiest way to get started is to clone the repository:
    ```bash
    # git@github.com:tumraja/nodejs-api-mongodb.git
    ```
   then
   
   ```bash
   # cd nodejs-api-mongodb
   ```
2. Install dependence

	```bash
	# yarn install OR # npm install
	```
 
3. Run the migration to create collections
   
   Replace `{name}` with available collections `(user, user_proxy, session, operator, tour)`
	```bash
	# ./node_modules/.bin/ts-node commands/migrations/create-collection-{name}.ts 
	```
    
    > You will see collections created in the dashboard under collections tab

4. Run development server

	```bash
	# yarn server:watch
	```
 
3. Run test
 
 	```bash
 	# yarn test
 	```

Adding credentials
---------------------

Once you have created a database and a user, update environment file configuration - `mongoAtlas`
> `config/enviroment.yaml`, add your `<username>:<password>`


How to test API
---------------

For the testing purposes, made a list of endpoints you can use in you preferred client. 
There are two types of storage used `MongoDB and InMemory store`. To test using `InMemory store` is very
straight forward. You just need to change one line of code and then you are good to go. 

> NOTE: MongoDB is used as a default storage, to switch to InMemory store, make changes on
> [storage.service.ts](src/services/storage/storage.service.ts) on line 22 to `InMemoryStorage()` and everything should
>work out of the box.

List of endpoints: [Endpoints](docs/ENDPOINT.md)


Where you can find me
--------------------

You can find me in [twitter](https://twitter.com/timmoraja) & [web](https://tumsime.com)
Thanks!

License
--------------------
Copyright (c) Tumsime Kondo. All rights reserved. Licensed under [MIT](docs/LICENCE.md) file.
