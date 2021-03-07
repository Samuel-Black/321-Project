import React, { Component } from 'react'
import { Levels } from '../components/Level-List'
import { Link } from 'react-router-dom'
import Xarrow from "react-xarrows"
import { TiHome } from 'react-icons/ti'
import { MapInteractionCSS } from 'react-map-interaction';

export default class LevelNavigationPage extends Component {
//Design is not finalized, just trying different things, mainly positioning of level icons in regards to responsiveness
//Implemented zoom and scrolling funcitonality for mobile/tablet interaction, currently disabled however, due to issues

    constructor(props) {
        super(props);
        this.state = {
            xMin: 0,
            xMax: 0,
            yMin: 0,
            yMax: 0
        }
    }

    render() {
        return (
            <MapInteractionCSS 
                disableZoom={false} 
                minScale={1} 
                maxScale={1.5} 
                translationBounds={this.state} 
            >
                
                <div id="Level-Nav-Background-Container">
                <Link to={'../'}>
                    <TiHome id="Level-Navigation-Home-Button" size={85} />
                </Link>
                    <div id="Level-Nav-Background">
                        <div id="Level-Nav">
                            {Levels.map(level => {
                                return (
                                    <div key={level.id} id={"Level-Container-"+level.id} className="Level-Container">
                                        <Link to={level.to}>
                                            <div class="nav-item" id={"Game-"+level.id}>
                                                <span class="level-number">{level.name}</span>
                                            </div>
                                        </Link>
                                        {level.id > 1 &&
                                        <Xarrow
                                            start={"Game-" + (level.id-1)} //can be react ref
                                            end={"Game-" + (level.id)} //or an id
                                            headSize={0} strokeWidth={18} path={"smooth"} curveness={0.9} />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </MapInteractionCSS>
        );
    }
}
