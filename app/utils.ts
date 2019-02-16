import { isEqual, round } from 'lodash';


export const todo = (): never => { throw Error('not implemented yet'); };


export const equals = (a: any) => (b: any): boolean => isEqual(a, b);


export const areClose = (a: number, b: number): boolean => {
    return round(a, 4) === round(b, 4);
};


export const randomElement = <T>(array: T[]): T =>
    array[Math.floor(Math.random() * array.length)];
