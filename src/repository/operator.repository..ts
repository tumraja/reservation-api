import { Operator } from './../model/operator';
import { clientService } from './../services/database.service';

class OperatorRepository {
    private counter: number = 0;

    public async create(data: Operator) {
        const primaryId = this.counter += 1;
        const newDocument = {
            _id: primaryId,
            name: data.name,
            country: data.country,
            isVerified: data.isVerified
        };

        const db = clientService.db();
        const document = await db.collection('operators').insertOne(newDocument);
        console.log('created: ', document.ops);
        return document.ops;
    }

    public async get(operatorId?: number) {
        const db = clientService.db();
        if (!operatorId) {
            console.log('get: all tours');

            const document = await db.collection('operators').find()
                    .project({'name': 1, 'country': 1, 'isVerified': 1, '_id': 1})
                    .toArray();

            clientService.close();

            return document;
        } else {
            const document=  await this.findById(db, operatorId);
            clientService.close();
            return document;
        }
    }

    private async findById(db: any, id: number) {
        console.log('get: ', id);
        const document: Operator = await db.collection('operators').find({_id: {$eq: id}})
                    .project({'name': 1, 'country': 1, 'isVerified': 1, '_id': 1})
                    .toArray();
        clientService.close();
        return document;
    }

    public async update(operatorId: number, data: any) {
        console.log('update: ', {operatorId, data})
        const collection = clientService.db().collection('operators');

        const document = await collection.updateOne({id: {$eq: operatorId}}, {$set: {name: data.name}});
        clientService.close();
        return document;
    }

    public async destroy(operatorId: number) {
        console.log('destroy: ', operatorId);
        const collection = clientService.db().collection('operators');

        const document = await collection.findOneAndDelete({_id: {$eq: operatorId}});
        clientService.close();
        return document;
    }
}

export const operatorRepository = new OperatorRepository();
