/**
 * MongoClientProvider is responsible for initiating connection to MongoDB cluster
 * select Collection and returning an instance of the MongoDB
 */

import { config } from "../../../../config/config";
const MongoClient  = require('mongodb').MongoClient;

export class MongoClientProvider {
    private client;
    private collection;

    constructor() {
        this.client = new MongoClient(config().mongoAtlas.url, { useUnifiedTopology: true });
        this.client.connect();
    }

    public  setCollection(name: string) {
        this.collection = this.client.db(config().mongoAtlas.dbname).collection(name);
    }

    public get getCollection() {
        return this.collection;
    }

    private close() {
        // this.dbClient.close();
    }
}
