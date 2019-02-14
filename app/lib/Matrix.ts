// TypeScript version of https://github.com/not-an-aardvark/node-matrices

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
}
