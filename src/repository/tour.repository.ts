import { Tour } from './../model/tour';
import { storageService } from "../services/storage/storage.service";

class TourRepository {
    private counter: number = 0;
    private storageService;

    constructor() {
        this.storageService = storageService.instance;
    }

    public create(data: Tour) {
        this.initCollection();
        const newDocument = this.prepareDocument(data);
        return this.storageService.create(newDocument)
    }

    private prepareDocument(data: Tour): Tour {
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
        this.initCollection();
        const project = { 'description' : 1, 'name' : 1, 'image': 1, 'size': 1, 'price': 1, 'include': 1, 'operator': 1 };
        return this.storageService.aggregate(project);
    }

    public findById(id: number) {
        this.initCollection();
        const project  =  { 'tours' : 1, 'name' : 1, 'image': 1, 'size': 1, 'price': 1, 'include': 1 };
        return this.storageService.findById(id, project);
    }

    public update(tourId: number, data: any) {
        this.initCollection();
        return this.storageService.update(tourId, data);
    }

    public destroy(tourId: number) {
        this.initCollection();
        return this.storageService.destroy(tourId);
    }

    private initCollection() {
        this.storageService.setCollection('tours');
    }
}

export const tourRepository = new TourRepository();
