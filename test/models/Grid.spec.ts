import { times } from 'lodash';

import Grid from '../../app/models/Grid';
import Direction from '../../app/models/Direction';
import Cubes from '../../app/models/Cubes';
import Coord from '../../app/models/Coord';
import Cube from '../../app/models/Cube';


describe(Grid, () => {

    it('should hold cubes', () => {
        const grid = new Grid();
        expect(grid.cubes).toEqual(new Cubes());
    });

    it('should have bottom gravity', () => {
        const grid = new Grid();
        expect(grid.gravity).toBe(Direction.BOTTOM);
    });

});


describe(Grid.prototype.upperFree, () => {

    it('should return the first free slot (BOTTOM gravity and empty colum)', () => {
        const grid = new Grid();
        expect(grid.upperFree(new Coord(1, 0, 1)))
        .toEqual(new Coord(1, 0, 1));
    });

    it('should return the first free slot (LEFT gravity and one cube)', () => {
        const grid = new Grid(
            new Cubes(new Cube(128, new Coord(0, 2, 1))),
            Direction.LEFT
        );
        expect(grid.upperFree(new Coord(0, 2, 1)))
        .toEqual(new Coord(1, 2, 1));
    });

    it('should return the first free slot (FRONT gravity and three cubes filling the column)', () => {
        const grid = new Grid(
            new Cubes(
                new Cube(128, new Coord(1, 0, 0)),
                new Cube(128, new Coord(1, 0, 1)),
                new Cube(128, new Coord(1, 0, 2))
            ),
            Direction.FRONT
        );
        expect(grid.upperFree(new Coord(1, 0, 0))).toBeUndefined();
    });

    it('should do the same for BACK gravity', () => {
        const grid = new Grid(
            new Cubes(
                new Cube(128, new Coord(1, 0, 0)),
                new Cube(128, new Coord(1, 0, 1)),
                new Cube(128, new Coord(1, 0, 2)),
            ),
            Direction.BACK
        );
        expect(grid.upperFree(new Coord(1, 0, 2))).toBeUndefined();
    });

});


describe(Grid.prototype.addRandomCubes, () => {

    it('should return a new Grid with 2 new cubes', () => {
        times(100, () => {
            const grid = new Grid().addRandomCubes();

            expect(grid.cubes.size()).toBe(2);

            const bottomCube =
                grid.cubes.cubes.find(cube => cube.coord.y === 0);
            const middleCube =
                grid.cubes.cubes.find(cube => cube.coord.y === 1);

            if (bottomCube !== undefined && middleCube !== undefined) {
                expect(bottomCube.coord.x).toBe(middleCube.coord.x);
                expect(bottomCube.coord.z).toBe(middleCube.coord.z);
            } else {
                grid.cubes.cubes.forEach(cube => {
                    expect(cube.coord.y).toBe(0);
                });
            }
        });
    });

});
