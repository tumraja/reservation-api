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
   
   Replace `{name}` with available collections `(users, users_proxy, sessions, operators, tours)`
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
