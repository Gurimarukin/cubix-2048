import { times } from 'lodash';

import Cube from './Cube';
import Cubes from './Cubes';
import OrthoVect from './OrthoVect';
import Coord from './Coord';

import { randomElement } from '../utils';


export default class Grid {
    static empty(): Grid {
        return new Grid(new Cubes(), OrthoVect.BOTTOM);
    }

    cubes: Cubes;
    gravity: OrthoVect;

    private constructor (cubes: Cubes, gravity: OrthoVect) {
        this.cubes = cubes;
        this.gravity = gravity;
    }

    addRandomCubes(n: number=2): Grid {
        return times(n).reduce((grid: Grid) => grid.addRandomCube(), this);
    }

    addRandomCube(): Grid {
        const coord = randomElement(this.freeTop());

        return new Grid(
            this.cubes.add(new Cube(Math.random() < 0.9 ? 2 : 4, coord)),
            this.gravity
        );
    }

    freeTop(): Coord[] {
        const frees: Array<Coord | undefined> =
            this.gravity.bottomSlots().map(this.upperFree);

        return frees.filter(coord => coord !== undefined) as Coord[];
    }


    upperFree = (coord: Coord): Coord | undefined => {
        if (this.cubes.cubeByCoord(coord) === undefined) return coord;

        const above = this.currentAbove(coord);
        if (above === undefined) return undefined;

        return this.upperFree(above);
    }

    currentAbove(coord: Coord): Coord | undefined {
        const res = new Coord(
            coord.x - this.gravity.x,
            coord.y - this.gravity.y,
            coord.z - this.gravity.z
        );
        if (res.isValid()) return res;
        return undefined;
    }

    rotate(newGravity: OrthoVect): Grid {
        return new Grid(this.cubes, newGravity);
    }
}
