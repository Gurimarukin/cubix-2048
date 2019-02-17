import Coord from '../../app/models/Coord';


describe('Coord', () => {

    it('should hold 3D coordinates', () => {
        const coord = new Coord(1, 2, 3);

        expect(coord.x).toBe(1);
        expect(coord.y).toBe(2);
        expect(coord.z).toBe(3);
    });

});
