import { BiLogOut } from 'react-icons/bi'
import { useAuthPlayer } from '../libs'
import './Player-Signout.scss'

export default function PlayerSignout() {

    const currentPlayer = useAuthPlayer();

    return(
        <div id="Player-Logout-Button" className='d-flex mr-3 mt-3 ml-auto'>
            <a onClick={() => currentPlayer.setPlayer(false)}><BiLogOut size={100} /></a>
        </div>
    )

}