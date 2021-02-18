import React, { Component } from 'react'
import { Levels } from '../components/Level-List'
import { Link } from 'react-router-dom'
import Xarrow from "react-xarrows"
import ScrollDrag from '../components/ScrollDrag'
import { MapInteractionCSS } from 'react-map-interaction';

export default function LevelNavigationPage() {
//Design is not finalized, just trying different things, mainly positioning of level icons in regards to responsiveness

    return (
        <MapInteractionCSS disableZoom={false} minScale={1} translationBounds={[0, 1920, 0, 1009]}>
            <div id="Level-Nav-Background-Container">
                <div id="Level-Nav-Background">
                    <div id="Level-Nav" class="">
                        {Levels.map(level => {
                            return (
                                <div>
                                    <Link to={level.to}>
                                        <div key={level.id} class="nav-item" id={"Game-"+level.id}>
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