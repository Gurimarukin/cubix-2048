import OrthoVect from '../../app/models/OrthoVect';

import Coord from '../../app/models/Coord';


describe('OrthoVect.bottomSlots', () => {
    it('should return current bottom coordinates depending on gravity', () => {
        const slots = OrthoVect.BOTTOM.bottomSlots();

        expect(slots).toEqual([
            new Coord(0, 0, 0),
            new Coord(0, 1, 0),
            new Coord(0, 2, 0),
            new Coord(1, 0, 0),
            new Coord(1, 1, 0),
            new Coord(1, 2, 0),
            new Coord(2, 0, 0),
            new Coord(2, 1, 0),
            new Coord(2, 2, 0),
        ]);
    });
});
