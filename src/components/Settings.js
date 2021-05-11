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

  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { loading, errorMessage } = useAuthState();

  const closeModal = () => {
    setOpen(false);
    setpopupState(0);
    clearInput();
    setSuccessMessage(null);
  }

  const clearInput = () => {
    setoldPassword('');
    setNewPassword('');
  }

  const handleLogout = () => {
    logout(dispatch);
    window.location.reload(false);
  }

  const showChangePasswordForm = () => {
    setpopupState(2);
  }

  const showVerifyDetails = () => {
    setpopupState(1);
  }

  const [successMessage, setSuccessMessage] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
        await changePassword(dispatch, { oldPassword, newPassword });
        //setSuccessMessage('Success!')
        //setpopupState(0)
        clearInput();
    } catch (error) {
        console.log(error);
    }
  } 

    return (
      <div className='d-flex align-self-start'>
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
                  <a onClick={showChangePasswordForm}>
                      Change Password
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
              <div className="settingsContent">
                {`Phone Number: ${userData.attributes.phone_number}`}
              </div>
            </div>
          }
          {popupState === 2 &&
            <div>
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              <div id="Settings-Title" className="settingsContent">
                  <h3>Change Password</h3>
              </div>
              {errorMessage ? <p>{errorMessage}</p> : null}
              <form>
                <div>
                  <div className='d-flex ml-1 justify-content-center'>
                    <label htmlFor="oldPassword">Old Password: </label>
                    <input type="password" id='oldPassword' value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} disabled={loading} />
                  </div>
                  <div className='d-flex justify-content-center'>
                    <label htmlFor="newPassword">New Password: </label>
                    <input type="password" id='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={loading} />
                  </div>
                </div>
                {successMessage}
                {loading === true && <Oval />}<button id="Confirm-Change-Password-Button" className="btn btn-secondary mt-2 mb-2" onClick={handleChangePassword} disabled={loading}>Confirm</button>
              </form>
            </div>
          }
      </Popup>
    </div>
    )
}