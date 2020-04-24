import { StorageInterface } from "./storage.interface";

export class StorageService {
    private readonly storageClient;

    constructor(storage: StorageInterface) {
        this.storageClient = storage;
    }

    public connect() {
        this.storageClient.open();
    }

    public disconnect() {
        this.storageClient.close();
    }

    public get instance() {
        return this.storageClient;
    }

}
