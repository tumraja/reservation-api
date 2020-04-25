import { Request, Response } from "express";
import { sessionRepository } from "../repository/session.repository.";
import { bookingRepository } from "../repository/booking.repository";

class BookingController {
    public async bookTour(req: Request, resp: Response) {
        const sessionId = req.cookies['SESSID'];
        const userBooking = req.body;

        // if (!await sessionRepository.get(sessionId)) {
        //     resp.status(403).json({"error": 'Please check your account again or login'})
        // }

        if (userBooking.tourId && userBooking.email && userBooking.from && userBooking.to) {
            try {
                const collection = await bookingRepository.book(userBooking);
                resp.status(200).json(collection);
            } catch(err) {
                resp.sendStatus(403);
            }
        } else {
            resp.send(403).json({"error": "Fill all the fields"});
        }
    }
}

export const bookingController = new BookingController();
