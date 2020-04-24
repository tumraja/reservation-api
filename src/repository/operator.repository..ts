import { Operator } from './../model/operator';
import { StorageService } from "../services/storage/storage.service";
import { DatabaseStorage } from "../services/storage/datatabase.storage";

class OperatorRepository {
    private counter: number = 0;
    private storageService: StorageService;

    constructor() {
        this.storageService = new StorageService(new DatabaseStorage('operators'));
        this.storageService.connect();
    }

    public create(data: Operator) {
        const primaryId = this.counter += 1;
        const newDocument = {
            _id: primaryId,
            name: data.name,
            country: data.country,
            isVerified: data.isVerified
        };

        return this.storageService.instance.create(newDocument);
    }

    public getAll() {
        return this.storageService.instance.find();
    }

    public findById(id: number | string) {
        return this.storageService.instance.findById(id);
    }

    public update(operatorId: number, data: any) {
        return this.storageService.instance.update(operatorId, {name: data.name});
    }

    public destroy(operatorId: number) {
        return this.storageService.instance.destroy(operatorId);
    }
}

export const operatorRepository = new OperatorRepository();
