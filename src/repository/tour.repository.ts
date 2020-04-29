import { TourModel } from '../model/tour.model';
import { storageService } from "../services/storage/storage.service";
import { DBQueryBuilderInterface } from "../services/storage/storage.interface";

class TourRepository {
    private counter: number = 0;
    private storageService: DBQueryBuilderInterface;

    constructor() {
        this.storageService = storageService.getInstance;
    }

    public create(data: TourModel) {
        const newDocument = this.prepareDocument(data);
        return this.storageService.create(newDocument, 'tours')
    }

    private prepareDocument(data: TourModel): TourModel {
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

    public get() {
        const project = { 'description' : 1, 'name' : 1, 'image': 1, 'size': 1, 'price': 1, 'include': 1, 'operator': 1 };
        return this.storageService.select('tours', project);
    }

    public findById(id: number) {
        const project  =  { 'tours' : 1, 'name' : 1, 'image': 1, 'size': 1, 'price': 1, 'include': 1 };
        return this.storageService.selectById(id, 'tours', project);
    }

    public update(tourId: number, data: any) {
        return this.storageService.update(tourId, data, 'tours');
    }

    public destroy(tourId: number) {
        return this.storageService.destroy(tourId, 'tours');
    }
}

export const tourRepository = new TourRepository();
