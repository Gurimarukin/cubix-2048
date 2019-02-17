import * as React from 'react';

import * as styles from './styles/GridComp.css';

import CubeComp from './CubeComp';

import Grid from '../models/Grid';
import Cube from '../models/Cube';
import Coord from '../models/Coord';

import Matrix from '../lib/Matrix';

import config from '../config';


interface IProps {
    grid: Grid;
    transform: string;
}

export default class GridComp extends React.Component<IProps> {
    render() {
        const cubeSize = config.cubeSize;
        const cubeMargin = config.cubeMargin;

        return (
            <div className={styles.scene}>
                <style>
                    {`:root {
                        --cube-size: ${cubeSize}px;
                        --grid-size: ${3 * cubeSize + 4 * cubeMargin}px;
                    }`}
                </style>

                <div className={styles.grid}
                     style={{ transform: this.props.transform }}>
                    <div className={styles.borders}>
                        <div className={styles.borderFront} />
                        <div className={styles.borderTop} />
                        <div className={styles.borderRight} />
                        <div className={styles.borderLeft} />
                        <div className={styles.borderBottom} />
                        <div className={styles.borderBack} />
                    </div>

                    {this.props.grid.cubes.map(this.cubeInBrowerBasis)}
                </div>
            </div>
        );
    }

    private cubeInBrowerBasis = (cube: Cube, i: number): JSX.Element => {
        let mat = new Matrix([0]);
        mat = mat;
        // const toBrowserBasis = new Matrix(
        //     [1,  0,  0],
        //     [0,  0, -1],
        //     [0, -1,  0]
        // );
        // const oldCoord = new Matrix(
        //     [cube.coord.x],
        //     [cube.coord.y],
        //     [cube.coord.z],
        // );
        // const newCoord = toBrowserBasis.multiply(oldCoord).data;
        const res = new Cube(
            cube.value,
            // new Coord(newCoord[0][0], newCoord[1][0], newCoord[2][0])
            new Coord(
                cube.coord.x,
                -cube.coord.z + 2,
                -cube.coord.y + 1
            )
        );
        return <CubeComp key={i} cube={res} />;
    }
}
