import { OperatorModel } from "./operator.model";

export interface TourModel {
   _id: number;
   name: string,
   description: string;
   type: string,
   price: string;
   duration: string;
   include: string[];
   operatorId: number;
   imageUrl: string;
   size?: number;
   operator?: OperatorModel[];
}
