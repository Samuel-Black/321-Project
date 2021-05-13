/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { TiTick } from 'react-icons/ti'
import { RiLock2Fill } from 'react-icons/ri'
import { BsArrowRightShort } from 'react-icons/bs'
import '../components/Content-Lock.scss'

// template for skill/game link used in /LevelNavigation page and /LevelNavigation/{Game-Name}, e.g. /LevelNavigation/Kick
export function LevelSelectTemplate(props) {

    return (
        <div className={`d-inline-flex mb-5 Game-Container ${props.completed ? 'green' : 'orange' }`}>
            <div className="nav-item" id={"Game-"+props.skillID}>
                <div className="d-flex justify-content-end mr-2">
                    <div className="d-flex nav-item-svg">
                        {/* if all levels associated with a Skill e.g. Kick, or a particular game e.g. Kick-Legs are completed, display a tick; else display an arrow */}
                        {props.completed ? <TiTick size={40} /> : <BsArrowRightShort size={40} /> }
                    </div>
                </div>
                <div className="d-flex justify-content-center"><img src={props.monster} /></div>
                <div className="d-flex justify-content-center level-name">{props.levelName}</div>
                <div className="d-flex justify-content-center level-progress">{`${props.skillProgress} of ${props.numLevels} completed`}</div>
            </div>
        </div>
    )
}

// template for skill/game which is not a link, cannot be clicked, and shows a lock in the center. Used in /LevelNavigation page and /LevelNavigation/{Game-Name}, e.g. /LevelNavigation/Kick
export function LevelSelectTemplateLocked(props) {
    return (
        <div className={`d-inline-flex locked-content mb-5 Game-Container ${props.completed ? 'green' : 'orange' }`}>
        <RiLock2Fill size={80} />
            <div className="nav-item" id={"Game-"+props.skillID}>
                <div className="d-flex justify-content-center"><img src={props.monster} /></div>
                <div className="d-flex justify-content-center level-name">{props.levelName}</div>
                <div className="d-flex justify-content-center level-progress">{`${props.skillProgress} of ${props.numLevels} completed`}</div>
            </div>
        </div>
    )
}
