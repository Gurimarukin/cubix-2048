import { isEqual } from 'lodash';


export const todo = (): never => { throw Error('not implemented yet'); };


export const equals = (a: any) => (b: any): boolean => isEqual(a, b);


export const randomElement = <T>(array: T[]): T =>
    array[Math.floor(Math.random() * array.length)];
