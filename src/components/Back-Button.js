/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React from 'react'
import './Back-Button.scss'
import { useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi'

// back button used by all games (arrow in top left of screen)
export default function BackButton() {
    let navigate = useNavigate();
    return (
        <div className='d-flex align-self-start'>
            <a id="Back-Button" className='mt-2 ml-2' onClick={() => navigate(-1)}>
                <FiArrowLeftCircle id="Back" size={130} />
            </a>
        </div>
    )
}

