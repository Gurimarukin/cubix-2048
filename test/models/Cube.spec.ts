import Coord from "../../app/models/Coord";
import Cube from "../../app/models/Cube";


describe(Cube, () => {

    it('should hold a value and have coordinates', () => {
        const coord = new Coord(1, 2, 3);
        const cube = new Cube(4, coord);

        expect(cube.value).toBe(4);
        expect(cube.coord).toBe(coord);
    });

});
