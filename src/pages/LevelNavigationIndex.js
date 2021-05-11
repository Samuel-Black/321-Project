import React, { useState, useEffect } from 'react';
import { Skills } from '../components/Level-List';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import LevelNavbar from '../components/LevelNavbar';
import { LevelSelectTemplate, LevelSelectTemplateLocked } from '../components/Level-Select-Template';
import { GetProgress, getSkillProgress } from '../components/Player-Progress-Functions';
import { useAuthPlayer, useAuthUser } from '../libs';
import './LevelNavigationPage.scss';

export default function LevelNavigationPage(props) {

    const currentPlayer = useAuthPlayer();
    const user = useAuthUser();

    const [progress, setProgress] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        GetProgress(user, currentPlayer, setProgress, setErrorMessage);
    }, []);

    console.log(Skills);

    return (
        <div id="Level-Nav-Background">

            <LevelNavbar />

            <div className="container mt-5">
                <SimpleBar style={{ height: '60vh' }} autoHide={false}>
                    <div id="Level-Nav">
                        <div className= "d-flex flex-wrap justify-content-around">
                            {Skills.map((skill, i) => {
                                return (
                                    <div key={skill.name} className="d-flex">  
                                        {(skill.name === 'Catch' || skill.name === 'Underhand-Roll' || skill.name === 'Strike' || skill.name === 'Gallop') ? 
                                            <LevelSelectTemplateLocked completed={getSkillProgress(skill.name, progress) >= skill.numLevels} skillID={skill.id} monster={skill.monster} levelName={skill.name} skillProgress={getSkillProgress(skill.name, progress)} numLevels={skill.numLevels} />
                                        :
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
