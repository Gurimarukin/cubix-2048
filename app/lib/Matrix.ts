/**
 * TypeScript version of
 * https://github.com/not-an-aardvark/node-matrices/blob/master/matrix.js
 */
import * as _ from 'lodash';


export default class Matrix {
    data: number[][];

    constructor (...rows: number[][]) {
        if (_.uniq(_.map(rows, 'length')).length !== 1) {
            throw new Error('All rows must have the same length');
        }
        this.data = rows;
        Object.freeze(this);
    }

    toString(): string {
        const res = this.data.map(row => row.toString()).join(',\n');
        return `[\n${res}\n]`;
    }

    numRows(): number {
        return this.data.length;
    }

    numColumns(): number {
        return this.data[0].length;
    }

    get(rowIndex: number, columnIndex: number): number | undefined {
        return this.data[rowIndex] ? this.data[rowIndex][columnIndex] : undefined;
    }

    getRow(rowIndex: number): Matrix {
        return new Matrix(this.data[rowIndex]);
    }

    getColumn(columnIndex: number): Matrix {
        return new Matrix(..._.map(this.data, row => ([row[columnIndex]])));
    }

    omitRow(rowIndex: number): Matrix {
        return new Matrix(..._.filter(this.data, (value, index) => (index !== rowIndex)));
    }

    omitColumn(columnIndex: number): Matrix {
        return new Matrix(...this.data.map(row => (row.filter((value, index) => (index !== columnIndex)))));
    }

    multiply(otherMatrix: Matrix): Matrix {
        if (this.numColumns() !== otherMatrix.numRows()) {
            throw new Error('Incompatible dimensions for multiplication');
        }
        return new Matrix(..._.times(this.numRows(), rowIndex => (
            _.times(otherMatrix.numColumns(), columnIndex => (
                this.getRow(rowIndex)._baseMultiply(otherMatrix.getColumn(columnIndex)))))));
    }

    private _baseMultiply(columnMatrix: Matrix): number {
        return _.sum(_.map(this.data[0], (value, index) => (value * (columnMatrix.get(index, 0) as number))));
    }

    transpose(): Matrix {
        return new Matrix(..._.unzip(this.data));
    }

    isSquare(): boolean {
        return this.numRows() === this.numColumns();
    }

    adjugate(): Matrix {
        return this._cofactor().transpose();
    }

    private _cofactor(): Matrix {
        if (!this.isSquare()) {
            throw new Error('Cannot compute the cofactor of a non-square matrix');
        }
        return new Matrix(..._.times(this.numRows(), rowIndex => _.times(this.numColumns(), columnIndex => (this._cofactorEntry(rowIndex, columnIndex)))));
    }

    private _cofactorEntry (rowIndex: number, columnIndex: number) {
        return ((rowIndex + columnIndex) % 2 ? -1 : 1) * this.omitRow(rowIndex).omitColumn(columnIndex).determinant();
    }

    determinant(): number {
        if (!this.isSquare()) {
            throw new Error('Cannot compute the determinant of a non-square matrix');
        }
        if (this.numRows() === 1) return this.get(0, 0) as number;
        let sum = 0;
        for (let i = 0; i < this.numRows(); i++) {
            // No need to recursively compute the determinant if the value at the current location is zero anyway
            if (this.get(0, i) === 0) continue;
            sum += (this.get(0, i) as number) * this._cofactorEntry(0, i);
        }
        return sum;
    }

    inverse(): Matrix {
        const det = this.determinant();
        if (!det) {
            throw new Error('Cannot compute the inverse of a singular matrix');
        }
        return this.adjugate().scale(1 / det);
    }

    scale(scalar: number): Matrix {
        return this._map(value => (scalar * value));
    }

    private _map(iteratee: (value: number) => number): Matrix {
        return new Matrix(...this.data.map(row => row.map(iteratee)));
    }
}
