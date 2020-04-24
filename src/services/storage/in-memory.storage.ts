import { StorageInterface } from "./storage.interface";

export class InMemoryStorage implements StorageInterface {
    close() {
        console.log('close a file')
    }

    connect() {
        console.log('open a file')
    }

    getInstance() {
        console.log('Instance memory');
    }

    create(document) {
    }

    findById(id: number) {
    }

    getAll() {
    }

    destroy(id: number) {
    }

    find() {
    }

    update(id: number, data: any) {
    }
}
