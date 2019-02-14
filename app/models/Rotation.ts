import Direction from './Direction';

import Matrix from '../lib/Matrix';

import { rotateX, rotateZ } from '../utils';


export default class Rotation {
    bottom: Direction;
    front: Direction;

    constructor (bottom: Direction, front?: Direction) {
        this.bottom = bottom;
        this.front = front !== undefined
            ? front
            : (() => {
                if (bottom === Direction.FRONT) return Direction.TOP;
                if (bottom === Direction.BACK) return Direction.BOTTOM;
                return Direction.FRONT;
            })();
    }

    rotateUp(): Rotation | undefined {
        return this.rotate(rotateX(-90));
    }

    rotateDown(): Rotation | undefined {
        return this.rotate(rotateX(90));
    }

    rotateLeft(): Rotation | undefined {
        return this.rotate(rotateZ(-90));
    }

    rotateRight(): Rotation | undefined {
        return this.rotate(rotateZ(90));
    }

    rotate(matrix: Matrix): Rotation | undefined {
        const newBottom =
            Direction.fromMatrix(matrix.multiply(this.bottom.toMatrix()));
        const newFront =
            Direction.fromMatrix(matrix.multiply(this.front.toMatrix()));

        if (newBottom === undefined || newFront === undefined) return undefined;
        return new Rotation(newBottom, newFront);
    }
}
