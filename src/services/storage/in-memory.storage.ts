import { DBQueryBuilderInterface } from "./storage.interface";
import { document } from "./provider/in-memory-data.provider";

// TODO: Should implement a builder pattern
export class InMemoryStorage implements DBQueryBuilderInterface {
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

    // BookingModel
    updateByEmail(email: string, data: any, collection) {
        const result = document(collection).filter(document => document.email === email);

        if (result.length) {
            result[0].bookings.push(data.bookings);
        }

        return result;
    }
}
