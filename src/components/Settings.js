/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import Popup from 'reactjs-popup';
import { RiSettings3Fill } from 'react-icons/ri';
import { useAuthUser, useAuthDispatch, logout } from '../libs';
import { useState } from 'react';
import './Settings.scss';

// cog wheel shown in the top left of the home page when a user is signed in
export default function Settings() {

	const dispatch = useAuthDispatch();
  const user = useAuthUser();

  const [popupState, setpopupState] = useState(0); // 0 is the menu displaying a user's options, 1 is verify details
  const [open, setOpen] = useState(false); // popup state, false = closed

  // close the settings popup
  const closeModal = () => {
    setOpen(false);
    setpopupState(0);
  }

  // logout the current user and redirect them to the home page by refreshing
  const handleLogout = () => {
    logout(dispatch);
    window.location.reload(false);
  }

  // show the currently signed in user's email
  const showVerifyDetails = () => {
    setpopupState(1);
  }

    return (
      <div className='d-flex align-self-start mr-auto'>
        <button id="Settings-Button" type="button" className="btn" onClick={() => setOpen(o => !o)}><RiSettings3Fill size={85} /></button>
          <Popup 
              modal
              open={open} 
              closeOnDocumentClick
              closeOnEscape
              onClose={closeModal}
          >
          {/* display menu with a user's options */}
          {popupState === 0 &&
            <div>
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              <div id="Settings-Title" className="settingsContent">
                  <h3>Account Options</h3>
              </div>
              <div className="settingsContent">
                  <a onClick={showVerifyDetails}>
                      Verify Details
                  </a>
              </div>
              <div className="settingsContent">
                  <a onClick={handleLogout}>
                      Sign Out
                  </a>
              </div>
            </div>
          }

          {/* display a verified user's email */}
          {popupState === 1 &&
            <div>
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              <div id="Settings-Title" className="settingsContent">
                  <h3>Verify Details</h3>
              </div>
              <div className="settingsContent">
                {`Email: ${user.attributes.email}`}
              </div>
            </div>
          }
      </Popup>
    </div>
    );
}
