import { DBInterface, StorageInterface} from "./storage.interface";
import { MongoClientProvider } from "./provider/mongo-client.provider";
import { EmailTaken } from "../../Errors/email-taken";

export class MongoDbStorage implements DBInterface, StorageInterface {
    private provider;

    constructor() {
        this.provider = new MongoClientProvider();
    }

    public async create(newDocument, collection) {
        if (collection === 'users') {
            try {
                const proxy = await this.createDocument({
                    _id: newDocument._id,
                    email: newDocument.email
                }, `${collection}_proxy`);

                if (proxy) {
                    return await this.createDocument(newDocument, collection);
                }
            } catch (e) {
                throw new EmailTaken();
            }
        }

        return await this.createDocument(newDocument, collection);
    }

    private async createDocument(newDocument, collection) {
        this.provider.setCollection(collection);
        const document = await this.provider.getCollection.insertOne(newDocument);
        return document.ops;
    }

    public async select(collection, project?: object) {
        this.provider.setCollection(collection);

        const query = this.provider.getCollection.find();
        MongoDbStorage.projectQuery(project, query);
        const document = await query.toArray();

        return document;
    }

    public async selectById(id: number, collection, project?: object) {
        this.provider.setCollection(collection);

        const query = this.provider.getCollection.find({_id: id});
        MongoDbStorage.projectQuery(project, query);

        return query.toArray();
    }

    public async selectByEmail(email: string, collection, project?: object) {
        this.provider.setCollection(collection);

        const query = this.provider.getCollection.find({email: {$eq: email}});
        MongoDbStorage.projectQuery(project, query);

        return query.toArray();
    }


    public async update(id: number, data: any, collection) {
        if (collection === 'users') {
            try {
                const proxy = await this.updateDocument(id,  {email: data.email}, `${collection}_proxy`);

                if (proxy) {
                    return await this.updateDocument(id, data, collection);
                }
            } catch (e) {
                throw new Error(e.errmsg);
            }
        }

        return await this.updateDocument(id, data, collection);
    }

    private async updateDocument(id: number, data: any, collection) {
        this.provider.setCollection(collection);
        return await this.provider.getCollection.updateOne({_id: {$eq: id}}, {$set: data});
    }

    public async updateByEmail(email: string, data: any, collection) {
        this.provider.setCollection(collection);
        return await this.provider.getCollection.updateOne({email: {$eq: email}}, {$push : {data}});
    }

    public async destroy(id: number, collection) {
        this.provider.setCollection(collection);
        return await this.provider.getCollection.findOneAndDelete({_id: {$eq: id}});
    }

    public async aggregate(project?: object) {
        const query = this.provider.getCollection.aggregate(
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
        MongoDbStorage.projectQuery(project, query);
        const document = await query.toArray();

        return document;
    }

    private static projectQuery(project: {}, query) {
        if (project) {
            query.project(project);
        }
    }
}
