import { clientService } from "../services/database.service";

class BookingRepository {
    private counter: number = 0;

    public async book(data) {
        // TODO: each booking should have a status eg: active / inactive
        this.counter +=1;
        const usersCollection = clientService.db().collection('users');
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
