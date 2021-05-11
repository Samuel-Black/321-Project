import { BiLogOut } from 'react-icons/bi'
import { useAuthPlayer } from '../libs'
import './Player-Signout.scss'

export default function PlayerSignout() {

    const currentPlayer = useAuthPlayer();

    return(
        <div className='d-flex align-self-start'>
            <div id="Player-Logout-Button" className='d-flex'>
                <a onClick={() => currentPlayer.setPlayer(false)}><BiLogOut size={100} /></a>
            </div>
        </div>
    )

}