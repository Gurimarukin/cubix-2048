import OrthoBasis from '../../app/models/OrthoBasis';
import OrthoVect from '../../app/models/OrthoVect';

import Matrix from '../../app/lib/Matrix';


describe('OrthoBasis.prototype.rotate', () => {

    it('', () => {
        let basis: OrthoBasis = OrthoBasis.identity();

        basis = basis.rotateLeft();
        expect(basis.bottom()).toBe(OrthoVect.LEFT);
        expect(basis.front()).toBe(OrthoVect.FRONT);

        basis = basis.rotateDown();
        expect(basis.bottom()).toBe(OrthoVect.FRONT);
        expect(basis.front()).toBe(OrthoVect.RIGHT);

        basis = basis.rotateRight();
        expect(basis.bottom()).toBe(OrthoVect.BOTTOM);
        expect(basis.front()).toBe(OrthoVect.RIGHT);

        basis = basis.rotateUp();
        expect(basis.bottom()).toBe(OrthoVect.LEFT);
        expect(basis.front()).toBe(OrthoVect.BOTTOM);
    });

});


describe(OrthoBasis.prototype.transformMatrix3D, () => {

    it('should return matrix3D', () => {
        const basis = OrthoBasis.identity();
        basis.passageMatrix = new Matrix(
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        );
        expect(basis.transformMatrix3D())
        .toBe('matrix3D(1, 2, 3, 0, 4, 5, 6, 0, 7, 8, 9, 0, 0, 0, 0, 1)');
    });

});


describe(OrthoBasis.prototype.transform, () => {

    it('should append tranforms', () => {
        let basis: OrthoBasis = OrthoBasis.identity();
        expect(basis.transform).toBe('');

        basis = basis.rotateLeft();
        expect(basis.transform)
        .toBe(' rotateY(-90deg)');

        basis = basis.rotateDown();
        expect(basis.transform)
        .toBe(' rotateY(-90deg) rotateX(90deg)');

        basis = basis.rotateRight();
        expect(basis.transform)
        .toBe(' rotateY(-90deg) rotateX(90deg) rotateY(90deg)');

        basis = basis.rotateUp();
        expect(basis.transform)
        .toBe(' rotateY(-90deg) rotateX(90deg) rotateY(90deg) rotateX(-90deg)');
    });

});
