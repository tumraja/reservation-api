import { StorageInterface } from "./storage.interface";
import { config } from "../../../config/config";
const { MongoClient } = require('mongodb');

export class DatabaseStorage implements StorageInterface {
    private dbClient: { close: () => any; connect: () => any; db: (arg0: any) => any; };
    private readonly collectionName: string = undefined;

    public constructor(collectionName?: string) {
        this.collectionName = collectionName;
        this.dbClient = new MongoClient(config().mongoAtlas.url, { useUnifiedTopology: true });
    }

    async close() {
        await this.dbClient.close();
    }

    async open() {
        await this.dbClient.connect();
    }

    public getInstance() {
        return this.dbClient.db(config().mongoAtlas.dbname);
    }

    private get getCollection() {
        return this.getInstance().collection(this.collectionName);
    }

    public async create(newDocument) {
        const document = await this.getCollection.insertOne(newDocument);
        return document.ops;
    }

    public async update(id: number, data: any) {
        return await this.getCollection.updateOne({_id: {$eq: id}}, {$set: data});
    }

    public async destroy(id: number) {
        return await this.getCollection.findOneAndDelete({_id: {$eq: id}});
    }

    public async find() {
        const document = await this.getCollection.find().toArray();

        return document;
    }

    public async findById(id: number) {
        const document = await this.getCollection.find({_id: id}).toArray();
        return document;
    }

    public async aggregate() {
        const document = await this.getCollection.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'operators',
                        'localField': 'operatorId',
                        'foreignField': '_id',
                        'as': 'operator'
                    }
                }
            ])
           // .project({ 'description' : 1, 'name' : 1, 'image': 1, 'size': 1, 'price': 1, 'include': 1, 'operator': 1 })
            .toArray();

        return document;
    }
}
