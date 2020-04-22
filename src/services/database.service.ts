import { config } from '../../config/config';
const { MongoClient } = require('mongodb');

class Client {
    private cl;

    constructor() {
        this.cl = new MongoClient(config().mongoAtlas.url, { useUnifiedTopology: true });
    }

    public async connect(callback?) {
        console.log('Type: ', this.cl)
        await this.cl.connect(callback);
    }

    public async close() {
        await this.cl.close();
    }

    public db() {
        const db = this.cl.db(config().mongoAtlas.dbname);
        return db;
    }
}

export const clientService = new Client();
