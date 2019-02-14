import { isEqual } from 'lodash';

import Cube from './Cube';
import Coord from './Coord';


export default class Cubes {
    cubes: Cube[];

    constructor (...cubes: Cube[]) {
        this.cubes = cubes;
    }

    size(): number {
        return this.cubes.length;
    }

    cubeByCoord(coord: Coord): Cube | undefined {
        return this.cubes.find(cube => isEqual(coord, cube.coord));
    }

    add(...cubes: Cube[]): Cubes {
        return new Cubes(...this.cubes, ...cubes);
    }

    map<T>(f: (cube: Cube, i: number) => T): T[] {
        return this.cubes.map(f);
    }
}
