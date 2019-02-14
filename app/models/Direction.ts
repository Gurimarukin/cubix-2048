import { flatMap } from 'lodash';

import Vect from './Vect';
import Coord from './Coord';

import Matrix from '../lib/Matrix';

import { areClose } from '../utils';


export default class Direction extends Vect {
    static RIGHT  = new Direction( 1,  0,  0);
    static LEFT   = new Direction(-1,  0,  0);
    static TOP    = new Direction( 0,  1,  0);
    static BOTTOM = new Direction( 0, -1,  0);
    static BACK   = new Direction( 0,  0,  1);
    static FRONT  = new Direction( 0,  0, -1);

    static fromMatrix(matrix: Matrix): Direction | undefined {
        if (matrix.data.length !== 3 || matrix.data[0].length !== 1) {
            return undefined;
        }
        return [
            Direction.RIGHT,
            Direction.LEFT,
            Direction.TOP,
            Direction.BOTTOM,
            Direction.BACK,
            Direction.FRONT
        ].find(direction =>
               areClose(matrix.data[0][0], direction.x)
            && areClose(matrix.data[1][0], direction.y)
            && areClose(matrix.data[2][0], direction.z));
    }

    private constructor (x: number, y: number, z: number) {
        super(x, y, z);
    }

    bottomSlots(): Coord[] {
        const times3 = [0, 1, 2];
        return flatMap(times3, i => times3.map(j => {
            if (this === Direction.RIGHT)  return new Coord(2, i, j);
            if (this === Direction.LEFT)   return new Coord(0, i, j);
            if (this === Direction.TOP)    return new Coord(i, 2, j);
            if (this === Direction.BOTTOM) return new Coord(i, 0, j);
            if (this === Direction.BACK)   return new Coord(i, j, 2);
            /* Direction.FRONT */          return new Coord(i, j, 0);
        }));
    }
}
