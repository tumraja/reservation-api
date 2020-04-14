import { Operator } from './../model/operator';
import { clientService } from './../services/database.service';
import * as _ from 'lodash';
import { OPERATORS } from "../data/operators.data";
import { TOURS } from "../data/tours.data";
import { doc } from 'prettier';

class OperatorRepository {
    private counter: number = 0;

    public async create(data) {
        const primaryId = this.counter += 1;
        const newDocument = {
            id: primaryId,
            name: data.name
        }

        const db = clientService.db();
        const document = await db.collection('operators').insertOne(newDocument);
        console.log('created: ', document);
        clientService.close();
        return document;
    }

    public async get(operatorId?: number) {
        const db = clientService.db();
        if (!operatorId) {
            console.log('get: all tours');

            const document = await db.collection('operators').find()
                    .project({'name': 1, '_id': 1})
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
        const document: Operator = await db.collection('operators').find({id: {$eq: id}})
                    .project({'name': 1, '_id': 1})
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

        const document = await collection.findOneAndDelete({id: {$eq: operatorId}});
        clientService.close();
        return document;
    }
}

export const operatorRepository = new OperatorRepository();
