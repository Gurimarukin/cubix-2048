import { isEqual } from 'lodash';


export const todo = (): never => { throw Error('not implemented yet'); };


export const equals = (a: any) => (b: any): boolean => isEqual(a, b);


export const randomIndex =
    (array: any[]): number => Math.floor(Math.random() * array.length);
