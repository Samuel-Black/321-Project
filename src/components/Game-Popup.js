import React from 'react'
import Popup from 'reactjs-popup'
import './Game-Popup.scss'

const PopupExample = () => (
    <Popup open={true} closeOnDocumentClick={false} closeOnEscape={false} lockScroll={true} modal>
        {close => (
            
            <button
                className="button"
                onClick={() => {
                console.log("modal closed ");
                close();
                }}
            >
                Play
            </button>
            
        )}
    </Popup>
);

export default PopupExample;