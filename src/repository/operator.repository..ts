import { Operator } from './../model/operator';
import { storageService } from "../services/storage/storage.service";
import { DBInterface } from "../services/storage/storage.interface";

class OperatorRepository {
    private counter: number = 0;
    private project: object = {'name': 1, 'country': 1, 'isVerified': 1, '_id': 1};
    private storageService: DBInterface;

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

        return this.storageService.create(newDocument, 'operators');
    }

    public getAll() {
        return this.storageService.select('operators', this.project);
    }

    public findById(id: number | string) {
        return this.storageService.selectById(id, 'operators', this.project);
    }

    public update(operatorId: number, data: any) {
        return this.storageService.update(operatorId, {name: data.name}, 'operators');
    }

    public destroy(operatorId: number) {
        return this.storageService.destroy(operatorId, 'operators');
    }
}

export const operatorRepository = new OperatorRepository();
