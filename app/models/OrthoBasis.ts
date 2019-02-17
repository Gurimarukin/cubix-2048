import OrthoVect from './OrthoVect';

import Matrix from '../lib/Matrix';


const bottomMatrix = OrthoVect.BOTTOM.toMatrix();
const frontMatrix = OrthoVect.FRONT.toMatrix();

// const correction = new Matrix(
//     [1,  0,  0],
//     [0,  0, -1],
//     [0, -1,  0]
// );

export default class OrthoBasis {
    static identity(): OrthoBasis {
        return new OrthoBasis(
            new Matrix(
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1],
            ),
            ''
        );
    }

    passageMatrix: Matrix;
    transform: string;

    private constructor (passageMatrix: Matrix, transform: string) {
        this.passageMatrix = passageMatrix;
        this.transform = transform;
    }

    bottom(): OrthoVect | undefined {
        const res = this.passageMatrix.multiply(bottomMatrix);
        return OrthoVect.fromMatrix(res);
    }

    front(): OrthoVect | undefined {
        const res = this.passageMatrix.multiply(frontMatrix);
        return OrthoVect.fromMatrix(res);
    }

    // transformMatrix3D(): string {
    //     const res = this.passageMatrix
    //         .multiply(correction)
    //         .data
    //         .map(row => row.concat(0))
    //         .concat([0, 0, 0, 1])
    //         .reduce((acc, row) => acc.concat(row), [])
    //         .join(', ');
    //     return `matrix3D(${res})`;
    // }

    rotateUp(): OrthoBasis {
        return this.rotate(
            new Matrix( // x, -pi/2
                [1, 0,  0],
                [0, 0, -1],
                [0, 1,  0]
            ),
            OrthoVect.RIGHT,
        );
    }

    rotateDown(): OrthoBasis {
        return this.rotate(
            new Matrix( // x, pi/2
                [1,  0, 0],
                [0,  0, 1],
                [0, -1, 0]
            ),
            OrthoVect.LEFT,
        );
    }

    rotateLeft(): OrthoBasis {
        return this.rotate(
            new Matrix( // y, -pi/2
                [ 0, 0, 1],
                [ 0, 1, 0],
                [-1, 0, 0]
            ),
            OrthoVect.BACK,
        );
    }

    rotateRight(): OrthoBasis {
        return this.rotate(
            new Matrix( // y, pi/2
                [0, 0, -1],
                [0, 1,  0],
                [1, 0,  0]
            ),
            OrthoVect.FRONT,
        );
    }

    private rotate(matrix: Matrix, axe: OrthoVect): OrthoBasis {
        const inThisBasis = OrthoVect.fromMatrix(
            this.passageMatrix.multiply(axe.toMatrix())
        );

        if (inThisBasis === undefined) return this;

        const newTransform: string = ' ' + (() => {
            if (inThisBasis === OrthoVect.RIGHT) return 'rotateX(90deg)';
            if (inThisBasis === OrthoVect.LEFT)  return 'rotateX(-90deg)';
            if (inThisBasis === OrthoVect.BACK)  return 'rotateZ(-90deg)';
            if (inThisBasis === OrthoVect.FRONT) return 'rotateZ(90deg)';
            if (inThisBasis === OrthoVect.TOP)   return 'rotateY(-90deg)';
            /* OrthoVect.BOTTOM */               return 'rotateY(90deg)';
        })();

        return new OrthoBasis(
            this.passageMatrix.multiply(matrix),
            this.transform + newTransform
        );
    }
}
