export default class Coord {
    x: number;
    y: number;
    z: number;

    constructor (x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString(): string {
        return `Coord(${this.x}, ${this.y}, ${this.z})`;
    }

    isValid(): boolean {
        return (  0 <= this.x && this.x <= 2
               && 0 <= this.y && this.y <= 2
               && 0 <= this.z && this.z <= 2);
    }

    map<T>(f: (coord: number) => T): T[] {
        return [this.x, this.y, this.z].map(f);
    }
}
