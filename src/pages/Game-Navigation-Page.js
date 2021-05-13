/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React from 'react'
import SimpleBar from 'simplebar-react'
import { Link } from 'react-router-dom'
import LevelNavbar from '../components/Level-Navbar'
import { LevelSelectTemplate, LevelSelectTemplateLocked } from '../components/Level-Select-Template'
import 'simplebar/dist/simplebar.min.css'

// Navigation 
export default function GameNavigation(props) {

    return (
        <div id="Level-Nav-Background">
            
            {/* Show navigation menu at top of page */}
            <LevelNavbar />

            <div className="container mt-5">
                <SimpleBar style={{ height: '60vh' }} autoHide={false}>
                    <div id="Level-Nav">
                        <div className= "d-flex flex-wrap justify-content-around">
                            {props.Levels.map((level) => {
                                return ( 
                                    <div key={level.name} className="d-flex">  
                                        {(level.name === 'Slide-Eyes' || level.name === 'Slide-HipsShoulders' ) ?   
                                            <LevelSelectTemplateLocked completed={props.getProgress(level.name) >= level.numLevels} skillID={level.id} monster={level.monster} levelName={level.name} skillProgress={props.getProgress(level.name)} numLevels={level.numLevels} />
                                        :      
                                            <Link to={level.to}>
                                                <LevelSelectTemplate completed={props.getProgress(level.name) >= level.numLevels} skillID={level.id} monster={level.monster} levelName={level.name} skillProgress={props.getProgress(level.name)} numLevels={level.numLevels} />
                                            </Link>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}