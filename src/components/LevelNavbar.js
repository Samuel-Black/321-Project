import React from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaLongArrowAltRight } from 'react-icons/fa'
import { TiHome } from 'react-icons/ti'

export default function LevelNavbar() {

    let navigate = useNavigate()

    const paths = useLocation().pathname.split('/')

    return (
        <div id="Level-Navbar" className="d-flex align-content-center">
            {paths.map((path, i) => {
                return(
                    <>
                        {i === paths.length - 1 ?
                            <span className="ml-2 mt-2">
                                {path}
                            </span>
                            :
                            <>
                            {i === 0 && <TiHome size={25} className="ml-2 mt-2" />}
                                &nbsp;
                                <Link key={i} className="mr-1 ml-1 mt-2" to={`../../${path}`}>
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
    )
}