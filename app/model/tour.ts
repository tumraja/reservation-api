import { Operator } from "./operator";

export interface Tour {
   id: number;
   name: string,
   description: string;
   price: string;
   duration: string;
   include: string[];
   operatorId: number;
   imageUrl: string;
   size?: number;
   operator?: Operator[];
}
