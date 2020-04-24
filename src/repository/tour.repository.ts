import { Tour } from './../model/tour';
import { StorageService } from "../services/storage/storage.service";
import { DatabaseStorage } from "../services/storage/datatabase.storage";

class TourRepository {
    private counter: number = 0;
    private storageService: StorageService;

    constructor() {
        this.storageService = new StorageService(new DatabaseStorage('tours'));
        this.storageService.connect();
    }

    public create(data: Tour) {
        const newDocument = this.prepareDocument(data);
        return this.storageService.instance.create(newDocument)
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
        return this.storageService.instance.aggregate();
    }

    public findById(id: number) {
        return this.storageService.instance.findById(id);
    }

    public update(tourId: number, data: any) {
        return this.storageService.instance.update(tourId, data);
    }

    public destroy(tourId: number) {
        return this.storageService.instance.destroy(tourId);
    }
}

export const tourRepository = new TourRepository();
