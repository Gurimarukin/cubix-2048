import Cubes from '../../app/models/Cubes';
import Cube from '../../app/models/Cube';
import Coord from '../../app/models/Coord';


describe(Cubes.prototype.cubeByCoord, () => {

    it('should return cube for given coordinate if it exists', () => {
        const cubes = new Cubes(new Cube(4, new Coord(3, 1, 2)));

        expect(cubes.cubeByCoord(new Coord(3, 1, 2)))
        .toEqual(new Cube(4, new Coord(3, 1, 2)));
    });

    it('should return undefined if it doesn\'t exist', () => {
        const cubes = new Cubes(new Cube(4, new Coord(3, 1, 2)));

        expect(cubes.cubeByCoord(new Coord(2, 1, 2))).toBeUndefined();
    });

});
