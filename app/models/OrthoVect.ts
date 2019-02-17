import { flatMap } from 'lodash';

import Vect from './Vect';
import Coord from './Coord';

import Matrix from '../lib/Matrix';


export default class OrthoVect extends Vect {
    static RIGHT  = new OrthoVect( 1,  0,  0, 'RIGHT');
    static LEFT   = new OrthoVect(-1,  0,  0, 'LEFT');
    static BACK   = new OrthoVect( 0,  1,  0, 'BACK');
    static FRONT  = new OrthoVect( 0, -1,  0, 'FRONT');
    static TOP    = new OrthoVect( 0,  0,  1, 'TOP');
    static BOTTOM = new OrthoVect( 0,  0, -1, 'BOTTOM');

    static fromMatrix(matrix: Matrix): OrthoVect | undefined {
        if ( matrix.data.length !== 3
           || matrix.data[0].length !== 1) return undefined;

        return [
            OrthoVect.RIGHT,
            OrthoVect.LEFT,
            OrthoVect.BACK,
            OrthoVect.FRONT,
            OrthoVect.TOP,
            OrthoVect.BOTTOM
        ].find(orthoVect =>
               matrix.data[0][0] === orthoVect.x
            && matrix.data[1][0] === orthoVect.y
            && matrix.data[2][0] === orthoVect.z);
    }

    private name: string;

    private constructor (x: number, y: number, z: number, name: string) {
        super(x, y, z);
        this.name = name;
    }

    toString(): string {
        const xyz = [this.x, this.y, this.z].join(', ');
        return `${this.name}(${xyz})`;
    }

    bottomSlots(): Coord[] {
        const times3 = [0, 1, 2];

        const coord: (i: number) => (j: number) => Coord = (() => {
            if (this === OrthoVect.RIGHT)
                return (i: number) => (j: number) => new Coord(2, i, j);
            if (this === OrthoVect.LEFT)
                return (i: number) => (j: number) => new Coord(0, i, j);
            if (this === OrthoVect.BACK)
                return (i: number) => (j: number) => new Coord(i, 2, j);
            if (this === OrthoVect.FRONT)
                return (i: number) => (j: number) => new Coord(i, 0, j);
            if (this === OrthoVect.TOP)
                return (i: number) => (j: number) => new Coord(i, j, 2);
            /* OrthoVect.BOTTOM */
                return (i: number) => (j: number) => new Coord(i, j, 0);
        })();

        return flatMap(times3, i => times3.map(coord(i)));
    }
}
