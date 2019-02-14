import Matrix from '../lib/Matrix';


export default class Vect {
    x: number;
    y: number;
    z: number;

    constructor (x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    norm(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    unit(): Vect {
        return this.div(this.norm());
    }

    div(n: number): Vect {
        return new Vect(this.x / n, this.y / n, this.z / n);
    }

    toMatrix(): Matrix {
        return new Matrix(
            [this.x],
            [this.y],
            [this.z]
        );
    }
}
