import { Operator } from "./operator";

export interface Tour {
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
   operator?: Operator[];
}
