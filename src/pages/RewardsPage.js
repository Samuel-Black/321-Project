import React, { useEffect, useState } from "react";
import { useAuthPlayer, useAuthUser } from '../libs';
import { Link } from "react-router-dom";
import { Skills } from '../components/Level-List';
import SimpleBar from 'simplebar-react';
import { RiLock2Fill } from 'react-icons/ri';
import { Rewards } from '../components/Rewards-List';
import { TiHome } from 'react-icons/ti';
import { GetProgress, getSkillProgress } from '../components/Player-Progress-Functions'
//import { ReactPainter } from 'react-painter';
//import CanvasDraw from "react-canvas-draw";
//import { SizeMe } from 'react-sizeme';
//import { FaPaintBrush, FaEraser } from 'react-icons/fa';
//import { CirclePicker } from 'react-color';
//import { Dropdown } from 'react-bootstrap';
import 'simplebar/dist/simplebar.min.css';
import '../components/Content-Lock.scss';
import './RewardsPage.scss';

export default function RewardsPage(props) {

    const currentPlayer = useAuthPlayer();
    const user = useAuthUser();
    
    const [unlockCount, setUnlockCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        GetProgress(user, currentPlayer, setProgress, setErrorMessage);
    }, []);

    useEffect(() => {
        if(progress.length !== 0) {
            let count = 0;
            Skills.map((skill) => {
                if(getSkillProgress(skill.name, progress) >= skill.numLevels) {
                    count++;
                }
            });
            setUnlockCount(count);
        }
    }, [progress]);

    return(
        <div className="App">
        <Link to='../' id='Home-Nav-Button'>
            <TiHome size={100} />
        </Link>
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
                                            <div key={'Reward-'+i} className={`d-inline-flex reward-image mb-3 unlocked-content`}>
                                                <div id={reward.CharacterName + '-Unlock'}>
                                                        <a href={reward.Unlock} download>
                                                            <button className='btn btn-secondary'>
                                                                <div className='d-flex justify-content-center'>Download</div>
                                                            </button>
                                                        </a>
                                                        <img src={reward.Thumbnail} />
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
        </div>
    )
}



    /*

    
    const [draw, setDraw] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [activeColour, setActiveColour] = useState('#000');
    const [currentCanvas, setCurrentCanvas] = useState(null);
    const [width, height] = useWindowDimension();

    const [canvasProps, setCanvasProps] = useState({
                                                        color: "#ffc600",
                                                        width: 400,
                                                        height: 400,
                                                        brushRadius: 10,
                                                        lazyRadius: 12,
                                                        imgSrc: '',
                                                    });
    
    let canvasHistory = [];

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

    useEffect(() => {
        if(selectedMonster != null) {
            setCanvasProps({imgSrc: selectedMonster.Unlock});
        }
    }, [selectedMonster])

    const saveDrawing = (triggerSave, canvas) => {
        triggerSave();
        canvasHistory.push(canvas);
    }
    const Drawable = () => (
        <CanvasDraw 
            brushColor={canvasProps.color}
            brushRadius={canvasProps.brushRadius}
            lazyRadius={canvasProps.lazyRadius}
            canvasWidth={width * 0.6}
            canvasHeight={height} 
            imgSrc={canvasProps.imgSrc} 
        />
    );*/

    /*
    const Drawable = () => (
        <ReactPainter
            width={width * 0.63}
            height={height * 0.63}
            image={selectedMonster.Unlock}
            render={({ triggerSave, canvas, setLineWidth, setColor, imageDownloadUrl }) => (
                <div>
                    {typeof imageDownloadUrl !== 'string' &&
                        triggerSave() // on component mount, save blank image for downloading 
                    }
                    <div className="d-flex justify-content-center flex-wrap">
                        <button className="btn btn-secondary">
                            <a href={imageDownloadUrl} download>
                                Download
                            </a>
                        </button>
                        <div className="d-flex mb-3">
                            <Dropdown>
                                <div className='d-flex' style={{backgroundColor: activeColour}}>
                                    <Dropdown.Toggle variant="success" id="Colour-Palette-Dropdown">
                                        something
                                    </Dropdown.Toggle>
                                </div>
                                <Dropdown.Menu>
                                    <CirclePicker width={'400px'} onChangeComplete={ e => setColor(e.hex) } />
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="Colour-Palette-Dropdown">
                                    <FaPaintBrush size={30} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div className="d-flex align-items-end mr-2"><a onClick={() => setLineWidth(5)}><FaPaintBrush size={30} /></a></div>
                                    <div className="d-flex align-items-end mr-2"><a onClick={() => setLineWidth(13)}><FaPaintBrush size={40} /></a></div>
                                    <div className="d-flex align-items-end"><a onClick={() => setLineWidth(22)}><FaPaintBrush size={50} /></a></div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div id="Drawing-Canvas" className="d-flex justify-content-center" onMouseUp={() => saveDrawing(triggerSave, canvas)}>{canvas}</div>
                </div>
            )}
        />
    );
    */

/*
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
*/
