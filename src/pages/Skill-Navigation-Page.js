/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useState, useEffect } from 'react';
import { Skills } from '../components/Level-List';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import LevelNavbar from '../components/Level-Navbar';
import { LevelSelectTemplate, LevelSelectTemplateLocked } from '../components/Level-Select-Template';
import { GetProgress, getSkillProgress } from '../components/Player-Progress-Functions';
import { useAuthPlayer, useAuthUser } from '../libs';
import './Level-Navigation-Index.scss';

export default function LevelNavigationPage() {

    const [progress, setProgress] = useState([]); // current players progress
    const [errorMessage, setErrorMessage] = useState(null);

    const currentPlayer = useAuthPlayer(); // get current player
    const user = useAuthUser(); // get current authenticated and logged in user, if any

    // get current players progress on component mount
    useEffect(() => {
        GetProgress(user, currentPlayer, setProgress, setErrorMessage);
    }, []);

    return (
        <div id="Level-Nav-Background">

            <LevelNavbar />

            <div className="container mt-5">
                <SimpleBar style={{ height: '60vh' }} autoHide={false}>
                    <div id="Level-Nav">
                        <div className= "d-flex flex-wrap justify-content-around">
                            {Skills.map((skill) => {
                                return (
                                    <div key={skill.name} className="d-flex">  

                                        {/* Currently no assets for the Catch, Underhand-Roll, Strike and Gallop Skills, so display a lock instead of a clickable link */}
                                        {(skill.name === 'Catch' || skill.name === 'Underhand-Roll' || skill.name === 'Strike' || skill.name === 'Gallop') ? 
                                            
                                            <LevelSelectTemplateLocked completed={getSkillProgress(skill.name, progress) >= skill.numLevels} skillID={skill.id} monster={skill.monster} levelName={skill.name} skillProgress={getSkillProgress(skill.name, progress)} numLevels={skill.numLevels} />
                                        
                                        : // else display clickable links to the skills

                                            <Link to={skill.to} >
                                                <LevelSelectTemplate completed={getSkillProgress(skill.name, progress) >= skill.numLevels} skillID={skill.id} monster={skill.monster} levelName={skill.name} skillProgress={getSkillProgress(skill.name, progress)} numLevels={skill.numLevels} />
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
