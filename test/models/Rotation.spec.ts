import Rotation from '../../app/models/Rotation';
import Direction from '../../app/models/Direction';


describe(Rotation, () => {

    it('should correctly create front', () => {
        let rotation: Rotation;

        rotation = new Rotation(Direction.BOTTOM);
        expect(rotation.front).toBe(Direction.FRONT);

        rotation = new Rotation(Direction.LEFT);
        expect(rotation.front).toBe(Direction.FRONT);

        rotation = new Rotation(Direction.BACK);
        expect(rotation.front).toBe(Direction.BOTTOM);

        rotation = new Rotation(Direction.FRONT);
        expect(rotation.front).toBe(Direction.TOP);
    });

});


describe(Rotation.prototype.rotate, () => {

    it('should work', () => {
        let rotation: Rotation | undefined;

        rotation = new Rotation(Direction.BOTTOM).rotateLeft();
        expect(rotation)
            .toEqual(new Rotation(Direction.LEFT, Direction.FRONT));

        rotation = (rotation as Rotation).rotateDown();
        expect(rotation)
            .toEqual(new Rotation(Direction.FRONT, Direction.RIGHT));
    });

});
