import * as React from 'react';

import * as styles from './styles/GridComp.css';

import CubeComp from './CubeComp';

import Grid from '../models/Grid';
import Direction from '../models/Direction';

import config from '../config';


interface IProps {
    grid: Grid;
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
                     style={{
                         transform: this.transformFromGravityAndFront()
                     }}>
                    <div className={styles.borders}>
                        <div className={styles.borderFront} />
                        <div className={styles.borderTop} />
                        <div className={styles.borderRight} />
                        <div className={styles.borderLeft} />
                        <div className={styles.borderBottom} />
                        <div className={styles.borderBack} />
                    </div>

                    {this.props.grid.cubes.map((cube, i) =>
                        <CubeComp key={i} cube={cube} />)}
                </div>
            </div>
        );
    }

    private transformFromGravityAndFront(): string {
        const gravity = this.props.grid.gravity;

        if (gravity === Direction.RIGHT) return 'rotateZ(90deg)';
        if (gravity === Direction.LEFT)  return 'rotateZ(-90deg)';
        if (gravity === Direction.BACK)  return 'rotateX(90deg)';
        if (gravity === Direction.FRONT) return 'rotateX(-90deg)';
        if (gravity === Direction.TOP)   return 'rotateX(180deg)';
        /* Direction.BOTTOM */           return 'rotateX(0)';
    }
}
