import Popup from 'reactjs-popup'
import { RiSettings3Fill } from 'react-icons/ri'
import { useAuthDispatch, logout } from '../libs'
import { useNavigate } from 'react-router-dom';
import './Settings.scss'


export default function Settings(props) {
	const dispatch = useAuthDispatch()
  const navigate = useNavigate()

    const handleLogout = () => {
      logout(dispatch)
      window.location.reload(false);
    }

    return (
        <Popup 
            trigger={<button id="Settings-Button" type="button" className="btn"><RiSettings3Fill size={85} /></button>}
            modal
            open={false} 
            closeOnDocumentClick={true} 
            closeOnEscape={true}
        >
        {close => (
          <div>
            <a className="close" onClick={close}>
              &times;
            </a>
            <div>
                <a onClick={handleLogout}>
                    Sign Out
                </a>
            </div>
          </div>
        )}
        </Popup>
    )
}