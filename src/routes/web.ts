import { Application } from 'express';
import { operatorController } from './../controllers/operator.controller.';
import { tourController } from './../controllers/tour.controller';
import { userController } from "../controllers/user.controller";
import { loginController } from "../controllers/login.controller";
import { logoutController } from "../controllers/logout.controller";
import { bookingController } from "../controllers/booking.controller";

export function routes(app: Application) {
    app.route('/api/tour').post(tourController.create);
    app.route('/api/tours').get(tourController.get);
    app.route('/api/tours/:id').get(tourController.get);
    app.route('/api/tours/:id').put(tourController.update);
    app.route('/api/tours/:id').delete(tourController.destroy);

    app.route('/api/operator').post(operatorController.create);
    app.route('/api/operators').get(operatorController.get);
    app.route('/api/operators/:id').get(operatorController.get);
    app.route('/api/operators/:id').put(operatorController.update);
    app.route('/api/operators/:id').delete(operatorController.destroy);

    app.route('/api/booking').post(bookingController.bookTour);

    app.route('/api/user').post(userController.create);
    app.route('/api/user/:id').get(userController.get);
    app.route('/api/user/:id').put(userController.update);

    app.route('/api/login').post(loginController.login);
    app.route('/api/logout').post(logoutController.logout);

    //TODO
      // - search / filter endpoint
      // - cancel & update booking
}
