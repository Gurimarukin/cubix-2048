import { times } from 'lodash';

import Grid from '../../app/models/Grid';
import OrthoVect from '../../app/models/OrthoVect';
import Cubes from '../../app/models/Cubes';
import Coord from '../../app/models/Coord';
import Cube from '../../app/models/Cube';


describe('Grid', () => {

    it('should hold cubes', () => {
        const grid = Grid.empty();
        expect(grid.cubes).toEqual(new Cubes());
    });

    it('should have bottom gravity', () => {
        const grid = Grid.empty();
        expect(grid.gravity).toBe(OrthoVect.BOTTOM);
    });

});


describe('Grid.upperFree', () => {

    it('should return the first free slot (BOTTOM gravity and empty colum)', () => {
        const grid = Grid.empty();
        expect(grid.upperFree(new Coord(1, 1, 0)))
        .toEqual(new Coord(1, 1, 0));
    });

    it('should return the first free slot (LEFT gravity and one cube)', () => {
        const grid = Grid.empty();
        grid.cubes = new Cubes(new Cube(128, new Coord(0, 1, 2))),
        grid.gravity = OrthoVect.LEFT;
        expect(grid.upperFree(new Coord(0, 1, 2)))
        .toEqual(new Coord(1, 1, 2));
    });

    it('should return the first free slot (FRONT gravity and three cubes filling the column)', () => {
        const grid = Grid.empty();
        grid.cubes = new Cubes(
            new Cube(128, new Coord(1, 0, 0)),
            new Cube(128, new Coord(1, 1, 0)),
            new Cube(128, new Coord(1, 2, 0))
        );
        grid.gravity = OrthoVect.FRONT;
        expect(grid.upperFree(new Coord(1, 0, 0))).toBeUndefined();
    });

    it('should do the same for BACK gravity', () => {
        const grid = Grid.empty();
        grid.cubes = new Cubes(
            new Cube(128, new Coord(1, 0, 0)),
            new Cube(128, new Coord(1, 1, 0)),
            new Cube(128, new Coord(1, 2, 0)),
        );
        grid.gravity = OrthoVect.BACK;
        expect(grid.upperFree(new Coord(1, 2, 0))).toBeUndefined();
    });

});


describe('Grid.addRandomCubes', () => {

    it('should return a new Grid with 2 new cubes', () => {
        times(100, () => {
            const grid = Grid.empty().addRandomCubes();

            expect(grid.cubes.size()).toBe(2);

            const bottomCube =
                grid.cubes.cubes.find(cube => cube.coord.z === 0);
            const middleCube =
                grid.cubes.cubes.find(cube => cube.coord.z === 1);

            if (bottomCube !== undefined && middleCube !== undefined) {
                expect(bottomCube.coord.x).toBe(middleCube.coord.x);
                expect(bottomCube.coord.y).toBe(middleCube.coord.y);
            } else {
                grid.cubes.cubes.forEach(cube => {
                    expect(cube.coord.z).toBe(0);
                });
            }
        });
    });

});
