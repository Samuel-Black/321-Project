import React from 'react'
import { useLocation, Link } from "react-router-dom";
import { FaLongArrowAltRight } from 'react-icons/fa'
import { TiHome } from 'react-icons/ti'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

export default function LevelNavbar() {

    const paths = useLocation().pathname.split('/')

    return (
        <div id="Level-Navbar" className="d-flex">
            <div className="container-fluid">
                <SimpleBar style={{ width: '80vw' }} autoHide={false}>
                    <div className="d-inline-flex">
                        {paths.map((path, i) => {
                            return(
                                <>
                                    {i === paths.length - 1 ?
                                        <span className="d-flex ml-2 mt-2">
                                            {path}
                                        </span>
                                    :
                                        <>
                                            {i === 0 && <TiHome size={25} className="d-flex ml-2 mt-2" />}
                                                &nbsp;
                                                <Link key={i} className="d-flex mr-1 ml-1 mt-2" to={`../../${path}`}>
                                                    {path === '' ? 'Home' : path}
                                                </Link>
                                                &nbsp;
                                            {<FaLongArrowAltRight size={25} className="mt-2" />}
                                        </>
                                    }
                                </>
                            )
                        })}
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}