import { Booking } from "../model/booking";
import { storageService } from "../services/storage/storage.service";

class BookingRepository {
    private counter: number = 0;
    private storageService;

    constructor() {
        this.storageService = storageService.instance;
    }

    public async book(data: Booking) {
        this.storageService.setCollection('users');
        // TODO: each booking should have a status eg: active / inactive

        this.counter +=1;
        const primaryId = this.counter;

        const result = this.storageService.updateByEmail(data.email, {
                    bookings: {
                        _id: primaryId,
                        tourId: data.tourId,
                        email: data.email,
                        from: new Date(data.from),
                        to:  new Date(data.to),
                        comment: data.comment
                    }
            });

        return result;
    }
}

export const bookingRepository = new BookingRepository();
