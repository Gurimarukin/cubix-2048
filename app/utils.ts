import { isEqual, round } from 'lodash';

import Matrix from './lib/Matrix';
import Direction from './models/Direction';


export const todo = (): never => { throw Error('not implemented yet'); };


export const equals = (a: any) => (b: any): boolean => isEqual(a, b);


export const areClose = (a: number, b: number): boolean => {
    return round(a, 4) === round(b, 4);
};


export const randomElement = <T>(array: T[]): T =>
    array[Math.floor(Math.random() * array.length)];


const degreesToRadians = (degrees: number): number => degrees * Math.PI / 180;
// const radiansToDegrees = (radians: number): number => radians * 180 / Math.PI;

export const rotateX = (degrees: number): Matrix => {
    const radians = degreesToRadians(degrees);
    return new Matrix(
        [1, 0                , 0                 ],
        [0, Math.cos(radians), -Math.sin(radians)],
        [0, Math.sin(radians), Math.cos(radians) ]
    );
};

export const rotateZ = (degrees: number): Matrix => {
    const radians = degreesToRadians(degrees);
    return new Matrix(
        [Math.cos(radians), -Math.sin(radians), 0],
        [Math.sin(radians), Math.cos(radians) , 0],
        [0                , 0                 , 1]
    );
};



export const dir2str = (dir: Direction): string => {
    if (dir === Direction.RIGHT) return 'RIGHT';
    if (dir === Direction.LEFT) return 'LEFT';
    if (dir === Direction.TOP) return 'TOP';
    if (dir === Direction.BOTTOM) return 'BOTTOM';
    if (dir === Direction.BACK) return 'BACK';
    return 'FRONT';
};
