import { operatorRepository } from './../repository/operator.repository.';
import { Request, Response } from 'express';
import { Operator } from '../model/operator';

class OperatorController {
   public async create(req: Request, resp: Response) {
    try {
        const data = req.body;
        if (data.name) {
            const collection = await operatorRepository.create(data);
            resp.status(200).json(collection);
        } else {
           resp.status(403).json({"name": "Name cannot be empty"});            
        }
        
    } catch(err) {
        console.log("err: ", err);
        resp.sendStatus(403);
    }
  }

  public async get(req: Request, resp: Response) {
        try {
            const operatorId: number = parseInt(req.params.id);
            const document: Operator[] = await operatorRepository.get(operatorId);
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
            const document: Operator[] = await operatorRepository.update(operatorId, data);
            resp.status(200).json({'results': document});
        } catch(err) {
            console.log("err: ", err);
            resp.sendStatus(403);
        }
    }

    public async destroy(req: Request, resp: Response) {
        try {
            const operatorId = parseInt(req.params.id);
            if (!operatorId) {
                throw new Error('Failed to perfom requested operation');
            }

            const collection: Operator[] = await operatorRepository.destroy(operatorId);
            resp.status(200).json(collection);
        } catch(err) {
            console.log("err: ", err);
            resp.sendStatus(403);
        } 
    }
}

export const operatorController = new OperatorController();
