/**
 * StorageService returns an singleton instance of the storage type used
 * StorageEngine: DatabaseStorage (MongoDB) or InMemoryStorage
 */

import { DBInterface } from "./storage.interface";
import { InMemoryStorage } from "./in-memory.storage";
import { MongoDbStorage } from "./mongo-db.storage";

export class StorageService {
    private readonly storageClient: DBInterface;

    constructor(storage: DBInterface) {
        this.storageClient = storage;
    }

    public get instance(): DBInterface {
        return this.storageClient;
    }
}

export const  storageService = new StorageService(new MongoDbStorage());
