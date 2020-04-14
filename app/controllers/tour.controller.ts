import { Tour } from './../model/tour';
import { Request, Response } from 'express';
import { tourRepository } from '../repository/tour.repository';

class TourController {
   public async create(req: Request, resp: Response) {
        try {
            const data = req.body;
            if (data.name && data.description && data.imageUrl && data.size && data.price && data.include && data.operatorId && data.type) {
                const collection: Tour[] = await tourRepository.create(data);
                resp.status(200).json({'results': collection});
            } else {
                resp.status(403).json({"error": "Fill all the required fields"});
            }
        } catch(err) {
            console.log("err: ", err);
            resp.sendStatus(403);
        }
   }

   public async get(req: Request, resp: Response) {
        try {
            const tourId = parseInt(req.params.id);
            const document: Tour = await tourRepository.get(tourId);
            resp.status(200).json({'results': document});
        } catch(err) {
            console.log("err: ", err);
            resp.sendStatus(403);
        } 
   }

   public async update(req: Request, resp: Response) {
        try {
            const data = req.body;
            const operatorId = parseInt(req.params.id);
            const document: Tour[] = await tourRepository.update(operatorId, data);
            resp.status(200).json({'results': document});
        } catch(err) {
            console.log("err: ", err);
            resp.sendStatus(403);
        }
    }

    public async destroy(req: Request, resp: Response) {
        try {
            const operatorId: number = parseInt(req.params.id);
            if (!operatorId) {
                throw new Error('Failed to perfom requested operation');
            }

            const document: Tour[] = await tourRepository.destroy(operatorId);
            resp.status(200).json({'results': document});
        } catch(err) {
            console.log("err: ", err);
            resp.sendStatus(403);
        } 
    }
}

export const tourController = new TourController();
