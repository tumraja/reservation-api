import { StorageInterface } from "./storage.interface";
import { config } from "../../../config/config";
const { MongoClient } = require('mongodb');

export class DatabaseStorage implements StorageInterface {
    private dbClient;
    private collection;

    public constructor() {
        this.dbClient = new MongoClient(config().mongoAtlas.url, { useUnifiedTopology: true });
    }

    public async close() {
        await this.dbClient.close();
    }

    public async connect() {
        try {
            // Connect to the MongoDB cluster
            this.dbClient.connect((err) => {
                console.log('connected...');
            });
        } catch (e) {
            console.error('Connect to the MongoDB cluster err: ', e);
        }
    }

    public setCollection(name: string) {
        this.collection = this.getDBInstance().collection(name);
    }

    public async create(newDocument) {
        const document = await this.getCollection.insertOne(newDocument);
        return document.ops;
    }

    public async update(id: number, data: any) {
        return await this.getCollection.updateOne({_id: {$eq: id}}, {$set: data});
    }

    public async updateByEmail(email: string, data: any) {
        return await this.getCollection.updateOne({email: {$eq: email}}, {$push : {data}});
    }

    public async destroy(id: number) {
        return await this.getCollection.findOneAndDelete({_id: {$eq: id}});
    }

    public async find(project?: object) {
        const query = this.getCollection.find();
        DatabaseStorage.projectQuery(project, query);
        const document = await query.toArray();

        return document;
    }

    public async findById(id: number, project?: object) {
        const query = this.getCollection.find({_id: id});
        DatabaseStorage.projectQuery(project, query);

        return query.toArray();
    }

    public async aggregate(project?: object) {
        const query = this.getCollection.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'operators',
                        'localField': 'operatorId',
                        'foreignField': '_id',
                        'as': 'operator'
                    }
                }
            ]);
        DatabaseStorage.projectQuery(project, query);
        const document = await query.toArray();

        return document;
    }

    private static projectQuery(project: {}, query) {
        if (project) {
            query.project(project);
        }
    }

    private getDBInstance() {
        return this.dbClient.db(config().mongoAtlas.dbname);
    }

    private get getCollection() {
        return this.collection;
    }
}
