import OrthoVect from './OrthoVect';

import Matrix from '../lib/Matrix';


const bottomMatrix = OrthoVect.BOTTOM.toMatrix();
const frontMatrix = OrthoVect.FRONT.toMatrix();


export default class OrthoBasis {
    static identity(): OrthoBasis {
        return new OrthoBasis(
            new Matrix(
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ),
            '');
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

    transformMatrix3D(): string {
        // rotateX(-90deg)
        const correction = new Matrix(
            [1, 0,  0],
            [0, 0, -1],
            [0, 1,  0]
        );
        const res = this.passageMatrix
            .multiply(correction)
            .inverse()
            .data
            .map(row => row.concat(0))
            .concat([0, 0, 0, 1])
            .reduce((acc, row) => acc.concat(row), [])
            .join(', ');
        return `matrix3D(${res})`;
    }

    rotateUp(): OrthoBasis {
        return this.rotate(
            new Matrix(
                [1, 0,  0],
                [0, 0, -1],
                [0, 1,  0]
            ),
            this.transform + ' rotateX(-90deg)'
        );
    }

    rotateDown(): OrthoBasis {
        return this.rotate(
            new Matrix(
                [1,  0, 0],
                [0,  0, 1],
                [0, -1, 0]
            ),
            this.transform + ' rotateX(90deg)'
        );
    }

    rotateLeft(): OrthoBasis {
        return this.rotate(
            new Matrix(
                [ 0, 0, 1],
                [ 0, 1, 0],
                [-1, 0, 0]
            ),
            this.transform + ' rotateY(-90deg)'
        );
    }

    rotateRight(): OrthoBasis {
        return this.rotate(
            new Matrix(
                [0, 0, -1],
                [0, 1,  0],
                [1, 0,  0]
            ),
            this.transform + ' rotateY(90deg)'
        );
    }

    private rotate(matrix: Matrix, tranform: string): OrthoBasis {
        return new OrthoBasis(this.passageMatrix.multiply(matrix), tranform);
    }
}
