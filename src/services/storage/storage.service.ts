/**
 * StorageService returns an singleton instance of the storage type used
 * Engine: DatabaseStorage (MongoDB) or InMemoryStorage
 */

import { StorageInterface } from "./storage.interface";
import { DatabaseStorage } from "./datatabase.storage";

export class StorageService {
    private readonly storageClient;

    constructor(storage: StorageInterface) {
        storage.connect();
        this.storageClient = storage;
    }

    public get instance() {
        return this.storageClient;
    }
}

export const  storageService = new StorageService(new DatabaseStorage());
