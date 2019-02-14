import * as React from 'react';

import GridComp from './GridComp';

import Grid from '../models/Grid';
import Cubes from '../models/Cubes';
import Cube from '../models/Cube';
import Coord from '../models/Coord';
import Rotation from '../models/Rotation';


interface IState {
    grid: Grid;
    rotation: Rotation;
}

export default class App extends React.Component<{}, IState> {
    constructor (props: {}) {
        super(props);

        const newGrid = new Grid(
            new Cubes(
                new Cube(8, new Coord(0, 0, 0)),
                new Cube(4, new Coord(0, 0, 1)),
                new Cube(16, new Coord(0, 1, 2)),
                new Cube(32, new Coord(0, 2, 2)),
                new Cube(64, new Coord(1, 0, 2)),
                new Cube(4096*4, new Coord(2, 0, 2)),
            )
        );

        this.state = {
            grid: newGrid,
            rotation: new Rotation(newGrid.gravity),
        };
    }

    render() {
        return (
            <div tabIndex={0}
                 onKeyDown={this.onKeyDown}>
                <GridComp grid={this.state.grid} />
            </div>
        );
    }

    private onKeyDown = (e: React.KeyboardEvent) => {
        const rotation = this.state.rotation;
        const newRotation: Rotation | undefined = (() => {
            if (e.key === 'ArrowUp') return rotation.rotateUp();
            if (e.key === 'ArrowDown') return rotation.rotateDown();
            if (e.key === 'ArrowLeft') return rotation.rotateLeft();
            if (e.key === 'ArrowRight') return rotation.rotateRight();
            return undefined;
        })();

        if (newRotation !== undefined) {
            this.setState({
                grid: this.state.grid.rotate(newRotation.bottom),
                rotation: newRotation,
            });
        }
    }
}
