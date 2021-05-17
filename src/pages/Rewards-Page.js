/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useEffect, useState } from "react";
import { useAuthPlayer, useAuthUser } from '../libs';
import { Link } from "react-router-dom";
import { Skills } from '../components/Level-List';
import SimpleBar from 'simplebar-react';
import { RiLock2Fill } from 'react-icons/ri';
import { Rewards } from '../components/Rewards-List';
import { TiHome } from 'react-icons/ti';
import { GetProgress, getSkillProgress } from '../components/Player-Progress-Functions';
import 'simplebar/dist/simplebar.min.css';
import '../components/Content-Lock.scss';
import './Rewards-Page.scss';

export default function RewardsPage() {
    
    const [progress, setProgress] = useState(0); // a players total progress
    const [unlockCount, setUnlockCount] = useState(0); // total number of unlocks a player has
    console.log(progress);
    console.log(unlockCount);

    const [errorMessage, setErrorMessage] = useState(null);

    const currentPlayer = useAuthPlayer(); // get current player
    const user = useAuthUser(); // get authenticated & logged in user if any

    // get a players progress on component mount
    useEffect(() => {
        GetProgress(user, currentPlayer, setProgress, setErrorMessage);
    }, []);

    // on progress state change calculate the total number of unlocks a player has
    useEffect(() => {
        if(progress.length !== 0) { // if progress is initialized
            let count = 0;
            Skills.map((skill) => {
                if(getSkillProgress(skill.name, progress) >= skill.numLevels) { // if all levels/games within a skill are completed e.g. all games in the skill Kick etc.
                    count++; 
                }
            });
            setUnlockCount(count); // set unlock count
        }
    }, [progress]);

    return(
        <div className="App">
        <div className='d-flex align-self-start'>
            <Link to='../' id='Home-Nav-Button' className='d-inline-flex'>
                <TiHome size={100} />
            </Link>
        </div>
            <div id="Rewards-Page-Container" className="container mt-3">
                <div className="container">
                    <div className="row justify-content-center mt-3">
                        <h1 id="Rewards-Title">Rewards</h1>
                    </div>
                </div>
                <div id="Rewards-Content-Container" className="container-fluid mb-3">
                    <SimpleBar style={{ height: '60vh' }} autoHide={false}>
                        <div className="d-flex flex-wrap justify-content-around mt-4 rewards-content-flex">
                            {Rewards.map((reward, i) => {
                                return(
                                    <div key={'Reward-'+i} className='d-inline-flex'>
                                        {/* If unlock count is greater than the current value of i, this content has been unlocked and is available for download */}
                                        {unlockCount > i ?
                                            <div className={`d-inline-flex reward-image mb-3 unlocked-content`}>
                                                <div id={reward.CharacterName + '-Unlock'}>
                                                        <a href={reward.Unlock} download>
                                                            <button className='btn btn-secondary'>
                                                                <div className='d-flex justify-content-center'>Download</div>
                                                            </button>
                                                        </a>
                                                        <img src={reward.Thumbnail} />
                                                </div>
                                            </div>
                                        : // Else if the unlock count is not greater than the current value of i, this content is locked and is nto available for download
                                            <div key={'Reward-'+i} className={`d-inline-flex reward-image mb-3 locked-content`}>
                                            <RiLock2Fill size={80} />
                                            <div className='locked-message d-flex flex-wrap'>
                                                                                    {/* Prompt user as to how many more skills to complete to unlock this reward */}
                                                Master {(i + 1) - unlockCount} more {(i + 1) - unlockCount > 1 ? 'skills' : 'skill'} to unlock {reward.CharacterName}.
                                            </div>
                                                <div id={reward.CharacterName + '-Unlock'}>
                                                    <img src={reward.Thumbnail} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </div>
    );
}
