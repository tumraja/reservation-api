import { Operator } from './../model/operator';
import { storageService } from "../services/storage/storage.service";

class OperatorRepository {
    private counter: number = 0;
    private project: object = {'name': 1, 'country': 1, 'isVerified': 1, '_id': 1};
    private storageService;

    constructor() {
        this.storageService = storageService.instance;
    }

    public create(data: Operator) {
        const primaryId = this.counter += 1;
        const newDocument = {
            _id: primaryId,
            name: data.name,
            country: data.country,
            isVerified: data.isVerified
        };
        this.initCollection();
        return this.storageService.create(newDocument);
    }

    public getAll() {
        this.initCollection();
        return this.storageService.find(this.project);
    }

    public findById(id: number | string) {
        this.initCollection();
        return this.storageService.findById(id, this.project);
    }

    public update(operatorId: number, data: any) {
        this.initCollection();
        return this.storageService.update(operatorId, {name: data.name});
    }

    public destroy(operatorId: number) {
        this.initCollection();
        return this.storageService.destroy(operatorId);
    }

    private initCollection() {
        this.storageService.setCollection('operators');
    }
}

export const operatorRepository = new OperatorRepository();
