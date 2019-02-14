import { rotateX, rotateZ } from '../app/utils';
import Direction from '../app/models/Direction';


describe(rotateX, () => {

    it('should transform FRONT to TOP', () => {
        const front = Direction.FRONT.toMatrix();
        const rotation = rotateX(90);
        const top = Direction.TOP;

        const newVect = rotation.multiply(front);

        expect(newVect.data[0][0]).toBeCloseTo(top.x, 5);
        expect(newVect.data[1][0]).toBeCloseTo(top.y, 5);
        expect(newVect.data[2][0]).toBeCloseTo(top.z, 5);
    });

    it('should transform FRONT to BOTTOM', () => {
        const front = Direction.FRONT.toMatrix();
        const rotation = rotateX(-90);
        const bottom = Direction.BOTTOM;

        const newVect = rotation.multiply(front);

        expect(newVect.data[0][0]).toBeCloseTo(bottom.x, 5);
        expect(newVect.data[1][0]).toBeCloseTo(bottom.y, 5);
        expect(newVect.data[2][0]).toBeCloseTo(bottom.z, 5);
    });

});


describe(rotateZ, () => {

    it('should transform RIGHT to TOP', () => {
        const right = Direction.RIGHT.toMatrix();
        const rotation = rotateZ(90);
        const top = Direction.TOP;

        const newVect = rotation.multiply(right);

        expect(newVect.data[0][0]).toBeCloseTo(top.x, 5);
        expect(newVect.data[1][0]).toBeCloseTo(top.y, 5);
        expect(newVect.data[2][0]).toBeCloseTo(top.z, 5);
    });

    it('should transform LEFT to TOP', () => {
        const left = Direction.LEFT.toMatrix();
        const rotation = rotateZ(-90);
        const top = Direction.TOP;

        const newVect = rotation.multiply(left);

        expect(newVect.data[0][0]).toBeCloseTo(top.x, 5);
        expect(newVect.data[1][0]).toBeCloseTo(top.y, 5);
        expect(newVect.data[2][0]).toBeCloseTo(top.z, 5);
    });

});
