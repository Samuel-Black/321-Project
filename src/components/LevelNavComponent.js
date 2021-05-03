import React from 'react'
import { RiUserFill } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { BsArrowRightShort } from 'react-icons/bs'
import SimpleBar from 'simplebar-react'
import { Link } from 'react-router-dom'
import { useAuthPlayer } from '../libs/'
import LevelNavbar from '../components/LevelNavbar'
import { RiLock2Fill } from 'react-icons/ri'
import '../components/Content-Lock.scss'
import 'simplebar/dist/simplebar.min.css'

export default function LevelNavigationPage(props) {

    const currentPlayer = useAuthPlayer()

    return (
        <div id="Level-Nav-Background">
            <div className="container">
                <div className="d-flex flex-wrap mb-3">
                    <div className="mr-auto">
                        <h1 id="Level-Navigation-Title">JumpStart</h1>
                    </div>
                    <div id="Current-Player" className="align-self-center"> 
                        <RiUserFill />{currentPlayer.player.NickName}
                    </div>
                </div>
                <LevelNavbar />
            </div>
            <div className="container mt-5">
                <SimpleBar style={{ height: '60vh' }} autoHide={false}>
                    <div id="Level-Nav">
                        <div className= "d-flex flex-wrap justify-content-around">
                            {props.Levels.map((level,i) => {
                                return ( 
                                    <>   
                                        {(level.name === 'Slide-Eyes' || level.name === 'Slide-HipsShoulders' ) ?   
                                            <div className={`d-inline-flex locked-content justify-content-center align-items-center mr-4 mb-5 Game-Container ${props.getProgress(level.name) >= level.numLevels ? 'green' : 'orange' }`}>
                                                <RiLock2Fill size={80} />
                                                <div className="nav-item" id={"Game-"+level.id}>
                                                    <div className="d-flex justify-content-end">
                                                    </div>
                                                    <div className="d-flex justify-content-center"><img src={level.monster} /></div>
                                                    <div className="d-flex justify-content-center level-name">{level.name}</div>
                                                    <div className="d-flex justify-content-center level-progress">{`${props.getProgress(level.name)} of ${level.numLevels} completed`}</div>
                                                </div>
                                            </div>
                                        :      
                                            <Link to={level.to} key={i}>
                                                <div className={`d-inline-flex justify-content-center align-items-center mr-4 mb-5 Game-Container ${props.getProgress(level.name) >= level.numLevels ? 'green' : 'orange' }`}>
                                                    <div className="nav-item" id={"Game-"+level.id}>
                                                        <div className="d-flex justify-content-end">
                                                            <div className="d-inline-flex nav-item-svg">
                                                                {props.getProgress(level.name) >= level.numLevels ? <TiTick size={40} /> : <BsArrowRightShort size={40} /> }
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center"><img src={level.monster} /></div>
                                                        <div className="d-flex justify-content-center level-name">{level.name}</div>
                                                        <div className="d-flex justify-content-center level-progress">{`${props.getProgress(level.name)} of ${level.numLevels} completed`}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        }
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}