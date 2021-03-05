import { BiLogOut } from 'react-icons/bi'
import { useAuthPlayer } from '../libs'
import './Player-Signout.scss'

export default function PlayerSignout() {

    const currentPlayer = useAuthPlayer();

    return(
        <div id="Player-Logout-Button">
            <a onClick={() => currentPlayer.setPlayer(false)}><BiLogOut size={85} /></a>
        </div>
    )

}