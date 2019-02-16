import * as React from 'react';

import * as styles from './styles/CubeComp.css';

import Cube from '../models/Cube';

import config from '../config';


interface IProps {
    cube: Cube;
}

export default class CubeComp extends React.Component<IProps> {
    render() {
        return (
            <div className={this.valueStyle()}
                 style={{ transform: this.transformFromCoord() }}>
                <div className={styles.faceFront}>{this.props.cube.value}</div>
                <div className={styles.faceTop}>{this.props.cube.value}</div>
                <div className={styles.faceRight}>{this.props.cube.value}</div>
                <div className={styles.faceLeft}>{this.props.cube.value}</div>
                <div className={styles.faceBottom}>{this.props.cube.value}</div>
                <div className={styles.faceBack}>{this.props.cube.value}</div>
            </div>
        );
    }

    private valueStyle(): string {
        const value = this.props.cube.value;

        if (value === 2) return styles.cubeVal2;
        if (value === 4) return styles.cubeVal4;
        if (value === 8) return styles.cubeVal8;
        if (value === 16) return styles.cubeVal16;
        if (value === 32) return styles.cubeVal32;
        if (value === 64) return styles.cubeVal64;
        if (value === 128) return styles.cubeVal128;
        if (value === 256) return styles.cubeVal256;
        if (value === 512) return styles.cubeVal512;
        if (value === 1024) return styles.cubeVal1024;
        if (value === 2048) return styles.cubeVal2048;
        return styles.cubeValSuper;
    }

    private transformFromCoord(): string {
        // const coord = this.props.cube.coord;
        const s = config.cubeSize;
        const m = config.cubeMargin;
        const mPs = m + s;

        // const x = coord.x * mPs + m;
        // const y = coord.z * -mPs + 2 * s + 3 * m;
        // const z = coord.y * -mPs + 1 * s + 2 * m;
        // const y = coord.z * mPs + m;
        // const z = coord.y * mPs + m;

        const res = this.props.cube.coord
            .map(coord => `${coord * mPs + m}px`)
            .join(', ');

        return `translate3D(${res})`;
    }
}
