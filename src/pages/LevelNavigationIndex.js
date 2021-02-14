import React from 'react';
import { Levels } from '../components/Level-List';
import { Link } from 'react-router-dom';
import Xarrow from "react-xarrows";

export default class LevelNavigationPage extends React.Component {

    render() {
        return (
            <div id="Level-Nav-Background-Container">
                <div id="Level-Nav-Background">
                    <div id="Level-Nav" class="container">
                        {Levels.map(level => {
                            return (
                                <span>
                                    <Link to={level.to}>
                                        <div key={level.id} class="nav-item d-inline-flex align-items-center justify-content-center" id={"Game-"+level.id}>
                                            <span class="Level-Number">{level.name}</span>
                                        </div>
                                    </Link>
                                    {level.id > 1 &&
                                    <Xarrow
                                        start={"Game-" + (level.id-1)} //can be react ref
                                        end={"Game-" + (level.id)} //or an id
                                        headSize={0} strokeWidth={15} path={"smooth"} />
                                    }
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

}