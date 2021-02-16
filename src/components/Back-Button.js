import React from 'react'
import './Back-Button.scss'
import { useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi'

export default function BackButton() {
    let navigate = useNavigate();
    return (
        <div>
            <a id="Back-Button" onClick={() => navigate(-1)}>
                <FiArrowLeftCircle id="Back" size={130} />
            </a>
        </div>
    )
}

