import { Tour } from './../model/tour';
import { clientService } from './../services/database.service';

class TourRepository {
    private counter: number = 0;

    public async create(data) {
        const collection = clientService.db().collection('tours');
        const newDocument = this.prepareDocument(data);
        const document = await collection.insertOne(newDocument);
        return document.ops;
    }

    private prepareDocument(data): Tour {
        const primaryId = this.counter += 1;

        const document = {
            _id: primaryId,
            name: data.name,
            type: data.type,
            description: data.description,
            price: data.price,
            size: data.size,
            operatorId: data.operatorId,
            imageUrl: data.imageUrl,
            include: data.include,
            duration: data.duration
        };

        return document;
    }

    public async get(tourId?: number) {
        const collection = clientService.db().collection('tours');
        if (!tourId) {
            const document = await collection.aggregate(
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
                .project({ 'description' : 1, 'name' : 1, 'image': 1, 'size': 1, 'price': 1, 'include': 1, 'operator': 1 })
                .toArray();

            return document;
        }

        return this.findById(tourId);
    }

    private async findById(id) {
        const collection = clientService.db().collection('tours');
         const document = collection.find({id: id})
            .project({ 'tours' : 1, 'name' : 1, 'image': 1, 'size': 1, 'price': 1, 'include': 1 })
            .toArray();
        return document;
    }

    public async update(tourId: number, data: any) {
        console.log('update: ', {tourId, data});
        const collection = clientService.db().collection('tours');
        return await collection.updateOne({id: {$eq: tourId}}, {$set: data});
    }

    public async destroy(tourId: number) {
        console.log('destroy: ', tourId);
        const collection = clientService.db().collection('tours');
        return await collection.findOneAndDelete({id: {$eq: tourId}});
    }
}

export const tourRepository = new TourRepository();
