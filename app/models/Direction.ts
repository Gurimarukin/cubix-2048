import { flatMap } from 'lodash';

import Coord from './Coord';


export default class Direction extends Coord {
    static RIGHT  = new Direction( 1,  0,  0);
    static LEFT   = new Direction(-1,  0,  0);
    static TOP    = new Direction( 0,  1,  0);
    static BOTTOM = new Direction( 0, -1,  0);
    static BACK   = new Direction( 0,  0,  1);
    static FRONT  = new Direction( 0,  0, -1);

    private constructor (x: number, y: number, z: number) {
        super(x, y, z);
    }

    bottom(): Coord[] {
        const times3 = [0, 1, 2];
        return flatMap(times3, i => times3.map(j => {
            if (this === Direction.RIGHT)  return new Coord(2, i, j);
            if (this === Direction.LEFT)   return new Coord(0, i, j);
            if (this === Direction.TOP)    return new Coord(i, 2, j);
            if (this === Direction.BOTTOM) return new Coord(i, 0, j);
            if (this === Direction.BACK)   return new Coord(i, j, 2);
            if (this === Direction.FRONT)  return new Coord(i, j, 0);
            throw Error('this should never happen');
        }));
    }
}
