import { Booking } from "../model/booking";
import { StorageService } from "../services/storage/storage.service";
import { DatabaseStorage } from "../services/storage/datatabase.storage";

class BookingRepository {
    private counter: number = 0;
    private storageService: StorageService;

    constructor() {
        this.storageService = new StorageService(new DatabaseStorage());
        this.storageService.connect();
    }

    public async book(data: Booking) {
        // TODO: each booking should have a status eg: active / inactive
        const dbInstance = this.storageService.instance.getInstance();
        const usersCollection = dbInstance.collection('users');

        this.counter +=1;
        const primaryId = this.counter;

        try {
              return await usersCollection.updateOne({email: {$eq: data.email}},
                  {
                      $push: {
                          bookings: {
                              _id: primaryId,
                              tourId: data.tourId,
                              email: data.email,
                              from: new Date(data.from),
                              to:  new Date(data.to),
                              comment: data.comment
                          }
                      }
                  }
              );
        } catch (e) {
            console.log('Booking: ', e);
            throw new Error('Failed booking');
        }
    }
}

export const bookingRepository = new BookingRepository();
