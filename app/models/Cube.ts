import Coord from './Coord';


export default class Cube {
    value: number;
    coord: Coord;

    constructor (value: number, coord: Coord) {
        this.value = value;
        this.coord = coord;
    }

    toString(): string {
        return `Cube(${this.value}, ${this.coord})`;
    }
}
