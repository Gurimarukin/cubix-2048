import * as React from 'react';

import GridComp from './GridComp';

import Grid from '../models/Grid';
import Cubes from '../models/Cubes';
import Cube from '../models/Cube';
import Coord from '../models/Coord';
import OrthoBasis from '../models/OrthoBasis';


interface IState {
    grid: Grid;
    basis: OrthoBasis;
}

export default class App extends React.Component<{}, IState> {
    constructor (props: {}) {
        super(props);

        const newGrid = Grid.empty();
        newGrid.cubes = new Cubes(
            new Cube(4, new Coord(1, 0, 0)),
            new Cube(8, new Coord(2, 0, 0)),
            new Cube(16, new Coord(0, 1, 0)),
            new Cube(32, new Coord(0, 2, 0)),
            new Cube(64, new Coord(0, 0, 1)),
            new Cube(128, new Coord(0, 0, 2)),
        );

        this.state = {
            grid: newGrid,
            basis: OrthoBasis.identity(),
        };
    }

    render() {
        return (
            <div tabIndex={0}
                 ref={div => { if (div !== null) div.focus(); }}
                 onKeyDown={this.onKeyDown}>
                <GridComp grid={this.state.grid}
                          transform={this.state.basis.transform} />
            </div>
        );
    }

    private onKeyDown = (e: React.KeyboardEvent) => {
        const basis = this.state.basis;
        const newBasis: OrthoBasis | undefined = (() => {
            if (e.key === 'ArrowUp') return basis.rotateUp();
            if (e.key === 'ArrowDown') return basis.rotateDown();
            if (e.key === 'ArrowLeft') return basis.rotateLeft();
            if (e.key === 'ArrowRight') return basis.rotateRight();
            return undefined;
        })();

        if (newBasis !== undefined) {
            const newGravity = newBasis.bottom();

            if (newGravity !== undefined) {
                this.setState({
                    grid: this.state.grid.rotate(newGravity),
                    basis: newBasis,
                });
            }
        }
    }
}
