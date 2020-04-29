/**
 * StorageService returns an singleton instance of the storage type used
 * StorageEngine: DatabaseStorage (MongoDB) or InMemoryStorage
 */

import { DBQueryBuilderInterface } from "./storage.interface";
import { InMemoryStorage } from "./in-memory.storage";
import { MongoDbStorage } from "./mongo-db.storage";

export class StorageService {
    private readonly queryBuilder: DBQueryBuilderInterface;

    public constructor(queryBuilder: DBQueryBuilderInterface) {
        this.queryBuilder = queryBuilder;
    }

    public get getInstance(): DBQueryBuilderInterface {
        return this.queryBuilder;
    }
}

export const  storageService = new StorageService(new MongoDbStorage());
