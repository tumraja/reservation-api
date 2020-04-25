import { DBInterface, StorageInterface } from "./storage.interface";
import { document } from "./provider/in-memory-data.provider";

export class InMemoryStorage implements DBInterface, StorageInterface {
    create(data: any, collection) {
        return document(collection).push(data);
    }

    destroy(id: number) {
        return [];
    }

    select(collection) {
        return document(collection);
    }

    selectByEmail(id: number | string, collection) {
    }

    selectById(id: number | string, collection) {
        return document(collection).filter(document => document._id === id);
    }

    update(id: number, data: any, collection) {
        return [];
    }

    // Booking
    updateByEmail(email: string, data: any, collection) {
        const result = document(collection).filter(document => document.email === email);

        if (result.length) {
            result[0].bookings.push(data.bookings);
        }

        return result;
    }
}
