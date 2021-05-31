/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { BiLogOut } from 'react-icons/bi'
import { useAuthPlayer } from '../libs'
import './Player-Signout-Button.scss'

// Signout button in top right of home page
export default function PlayerSignoutButton() {

    const currentPlayer = useAuthPlayer(); // get current player

    return(
        <div id="Player-Logout-Button" className='d-flex mr-3 mt-3 ml-auto'>
            <a onClick={() => currentPlayer.setPlayer(false)}><BiLogOut size={100} /></a>
        </div>
    )

}