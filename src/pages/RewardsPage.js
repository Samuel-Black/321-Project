import React, { useEffect, useState } from "react";
import { useAuthPlayer, useAuthUser, useRewardUnlocked } from '../libs';
import Axios from 'axios';
import { getLocalPlayer } from '../components/localstorage/Local-Storage-Functions';
import { GetTotalProgressURL } from '../components/Request-URL';
import { Skills } from '../components/Level-List';
import SimpleBar from 'simplebar-react';
import { RiLock2Fill } from 'react-icons/ri';
import { Rewards } from '../components/Rewards-List';
import { ReactPainter } from 'react-painter';
import { SizeMe } from 'react-sizeme';
import { FaPaintBrush, FaEraser } from 'react-icons/fa';
import { ColourPalette } from '../components/Colour-Palette.js';
import './RewardsPage.scss';
import 'simplebar/dist/simplebar.min.css';
import '../components/Content-Lock.scss';

export default function RewardsPage(props) {

    const currentPlayer = useAuthPlayer();
    const user = useAuthUser();
    
    const [unlockCount, setUnlockCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [draw, setDraw] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    function useWindowDimension() {
        const [dimension, setDimension] = useState([
            window.innerWidth,
            window.innerHeight,
        ]);
        useEffect(() => {
            const debouncedResizeHandler = debounce(() => {
                setDimension([window.innerWidth, window.innerHeight]);
            }, 100); // 100ms
            window.addEventListener('resize', debouncedResizeHandler);
            return () => window.removeEventListener('resize', debouncedResizeHandler);
        }, []); // Note this empty array. this effect should run only on mount and unmount
        return dimension;
      }
      
    function debounce(fn, ms) {
        let timer;
        return _ => {
            clearTimeout(timer);
            timer = setTimeout(_ => {
                timer = null;
                fn.apply(this, arguments);
          }, ms);
        };
      }

    const [width, height] = useWindowDimension();

    const Drawable = () => (
        <ReactPainter
            width={width * 0.66}
            height={height * 0.66}
            image={selectedMonster.Unlock}
            onSave={blob => console.log(blob)}
            render={({ triggerSave, canvas, setLineWidth, setColor }) => (
                <div>
                    <input type="number" onChange={e => setLineWidth(e.target.value)} />
                    <input type="color" onChange={e => setColor(e.target.value)} />
                    <div className="d-flex">
                        {ColourPalette.map((colour, i) => {
                            return(
                                <div className="d-flex colour-option" style={{backgroundColor:colour}} onClick={() => setColor(colour)} />
                            );
                        })}
                    </div>
                    <div id="Draw-Options" className="left-axis"></div>
                    <button onClick={triggerSave}>Save Canvas</button>
                    <div id="Drawing-Canvas" className="d-flex justify-content-center">{canvas}</div>
                </div>
            )}
        />
    );

    function getSkillProgress(SkillName) {
        let total = 0;
        for (let i = 0; i < progress.length; i++) {
            if (progress[i].SkillName === SkillName) {
                total += progress[i].LevelsCompleted;
            }
        }
        return total;
    }

    const GetProgress = () => {
        if(user !== false) { // If using a logged in account, get progress from DB
            Axios.post(GetTotalProgressURL, {
                UserName: user.attributes.sub,
                NickName: currentPlayer.player.NickName
            }).then((response) => {
                setProgress(response.data);
            }).catch((error) => {
                setErrorMessage(error);
            });
        }
        else if(user === false) { // If not using an account and not logged in, get progress from local storage
            let localPlayer = getLocalPlayer(currentPlayer.player.NickName);
            let localPlayerProgress = localPlayer.Progress;
            let localProgress = [];

            for(let skillKey in localPlayerProgress) {
                if(localPlayerProgress.hasOwnProperty(skillKey)) {
                    for(let gameKey in localPlayerProgress[skillKey]) {
                        let localLevelsCompleted = parseInt(localPlayerProgress[skillKey][gameKey]);
                        localProgress.push({ 'SkillName': skillKey, 'LevelsCompleted': localLevelsCompleted });
                    }
                }
            }
            setProgress(localProgress);
        }
    }

    useEffect(() => {
        if(progress.length !== 0) {
            let count = 0;
            Skills.map((skill) => {
                if(getSkillProgress(skill.name) >= skill.numLevels) {
                    count++;
                }
            });
            setUnlockCount(count);
        }
    }, [progress]);

    useEffect(() => {
        GetProgress();
    }, []);

    return(
        <div className="App">
            {draw === false ?
                <div id="Rewards-Page-Container" className="container">
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
                                        <>
                                            {unlockCount > i ?
                                                <div key={'Reward-'+i} className={`d-inline-flex reward-image mb-3`}>
                                                    <div id={reward.CharacterName + '-Unlock'}>
                                                        <a onClick={() => {setSelectedMonster(reward); setDraw(true);}} target='_blank'>
                                                            <img src={reward.Thumbnail} />
                                                        </a>
                                                    </div>
                                                </div>
                                            :
                                                <div key={'Reward-'+i} className={`d-inline-flex reward-image mb-3 locked-content`}>
                                                <RiLock2Fill size={80} />
                                                <div className='locked-message d-flex flex-wrap'>
                                                    Master {(i + 1) - unlockCount} more {(i + 1) - unlockCount > 1 ? 'skills' : 'skill'} to unlock {reward.CharacterName}.
                                                </div>
                                                    <div id={reward.CharacterName + '-Unlock'}>
                                                        <img src={reward.Thumbnail} />
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    );
                                })}
                            </div>
                        </SimpleBar>
                    </div>
                </div>
            :
                <div id="Rewards-Draw-Container" className="container-fluid">
                    <Drawable />
                </div>
            }
        </div>
    )
}