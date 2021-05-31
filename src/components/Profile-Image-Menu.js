/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { ProfilePictureImages } from './images/Profile-Picture-Images'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './Profile-Image-Menu.scss'

// Profile image selection when creating a new player
export default function ProfileImageMenu(props) {

    return (
        <SimpleBar style={{ width: '70vw' }} autoHide={false}>
            <div id="Profile-Image-Menu-Container">
                <div className="d-flex">
                    {ProfilePictureImages.map((image, i) => {
                        return (
                            <div key={i} className={`card ${props.ActiveProfileImage === i ? 'active' : ''}`}> {/* If profile picture is the currently selected profile image, give active class to display border in css */}
                                <a onClick={() => props.ProfileImageState(i)}>
                                    <img class="card-img-top" src={image.default} alt={`Profile Picture ${i}`} />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </SimpleBar>
    )

}
