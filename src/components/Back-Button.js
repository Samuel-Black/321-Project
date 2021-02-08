import React from 'react'
import './Back-Button.scss'
import { useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi'

export default function BackButton() {
    
    return (
        <div>
            <a id="Back-Button" onClick={useNavigate('../', { replace: true })}>
                <FiArrowLeftCircle id="Back" size={130} />
            </a>
        </div>
    )
}

