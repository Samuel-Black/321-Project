import Popup from 'reactjs-popup';
import { RiSettings3Fill } from 'react-icons/ri';
import { useAuthUser, useAuthDispatch, useAuthState, logout, changePassword } from '../libs';
import { useState } from 'react';
import { Oval } from 'react-loading-icons';
import './Settings.scss';

export default function Settings(props) {
	const dispatch = useAuthDispatch();
  const userData = useAuthUser();
  const [popupState, setpopupState] = useState(0);
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setpopupState(0);
  }

  const handleLogout = () => {
    logout(dispatch);
    window.location.reload(false);
  }

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
          {popupState === 1 &&
            <div>
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              <div id="Settings-Title" className="settingsContent">
                  <h3>Verify Details</h3>
              </div>
              <div className="settingsContent">
                {`Email: ${userData.attributes.email}`}
              </div>
            </div>
          }
      </Popup>
    </div>
    )
}