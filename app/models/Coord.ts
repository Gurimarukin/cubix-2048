export default class Coord {
    x: number;
    y: number;
    z: number;

    constructor (x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    isValid(): boolean {
        return (  0 <= this.x && this.x <= 2
               && 0 <= this.y && this.y <= 2
               && 0 <= this.z && this.z <= 2);
    }
}
