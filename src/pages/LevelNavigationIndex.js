import React from 'react';
import { Levels } from '../components/Level-List';
import { Link } from 'react-router-dom';

export default class LevelNavigationPage extends React.Component {
    
    constructor(props) {
        super(props);
    }

    state = {
        Levels
    };

    render() {
        return (
            <div id="Level-Nav-Background">
                <div id="Level-Nav" class="container">
                        {Levels.map(level => {
                            return (
                                <div key={level.id} class="nav-item" id={"Game-"+level.id}>
                                    <Link to={level.to}>
                                        <span class="Level-Number">{level.id}.</span>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }

}