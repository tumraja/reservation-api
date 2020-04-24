import { StorageInterface } from "./storage.interface";

export class InMemoryStorage implements StorageInterface {
    close() {
        // close stream
        console.log('close a file')
    }

    connect() {
        // if you read from a file check if file exists otherwise throw an exception
        console.log('open a file')
    }

    getInstance() {
        // :(
        console.log('Instance memory');
    }

    create(document) {
        // create tours / operators / users + bookings
    }

    findById(id: number) {
        // return single tours / operators / users + bookings
        return [{
            email: "email@email.com"
        }]
    }

    destroy(id: number) {
    }

    find() {
        // return all tours / operators / users + bookings
        return [
            'all'
        ]
    }

    update(id: number, data: any) {
        // update all tours / operators / users + bookings
    }

    public setCollection(name: string) {
    }
}
