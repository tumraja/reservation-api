import { BookingModel } from "../model/booking,model";
import { storageService } from "../services/storage/storage.service";
import { DBQueryBuilderInterface } from "../services/storage/storage.interface";

class BookingRepository {
    private counter: number = 0;
    private storageService: DBQueryBuilderInterface;

    constructor() {
        this.storageService = storageService.getInstance;
    }

    public async book(data: BookingModel) {
        // TODO: each booking should have a status eg: active / inactive

        this.counter +=1;
        const primaryId = this.counter;

        // TODO: booking should be an object, create a class that return booking object
        const result = this.storageService.updateByEmail(data.email, {
                    bookings: {
                        _id: primaryId,
                        tourId: data.tourId,
                        email: data.email,
                        from: new Date(data.from),
                        to:  new Date(data.to),
                        comment: data.comment
                    }
            }, 'users');

        return result;
    }
}

export const bookingRepository = new BookingRepository();
