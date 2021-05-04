import React from 'react'
import { useLocation, Link } from "react-router-dom";
import { FaLongArrowAltRight } from 'react-icons/fa'
import { TiHome } from 'react-icons/ti'
import { RiUserFill } from 'react-icons/ri'
import SimpleBar from 'simplebar-react'
import { useAuthPlayer } from '../libs'
import 'simplebar/dist/simplebar.min.css'

export default function LevelNavbar() {

    const currentPlayer = useAuthPlayer()
    const paths = useLocation().pathname.split('/')

    return (
        <div className="container">
            <div className="d-flex flex-wrap mb-3">
                <div className="mr-auto">
                    <h1 id="Level-Navigation-Title">JumpStart</h1>
                </div>
                <div id="Current-Player" className="align-self-center">
                    <RiUserFill />{currentPlayer.player.NickName}
                </div>
            </div>
            <div id="Level-Navbar" className="d-flex">
                <div className="container-fluid">
                    <SimpleBar style={{ width: '80vw' }} autoHide={false}>
                        <div className="d-inline-flex">
                            {paths.map((path, i) => {
                                return(
                                    <div key={'Path-' + i} className="d-flex">
                                        {i === paths.length - 1 ?
                                            <span className="d-flex ml-2 mt-2">
                                                {path}
                                            </span>
                                        :
                                            <>
                                                {i === 0 && <TiHome size={25} className="d-flex ml-2 mt-2" />}
                                                    &nbsp;
                                                    <Link className="d-flex mr-1 ml-1 mt-2" to={`../../${path}`}>
                                                        {path === '' ? 'Home' : path}
                                                    </Link>
                                                    &nbsp;
                                                {<FaLongArrowAltRight size={25} className="mt-2" />}
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </div>
    )
}