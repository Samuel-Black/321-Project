import { ProfilePictureImages } from './images/ProfilePictureImages'
import { RiLock2Fill } from 'react-icons/ri'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './Profile-Image-Menu.scss'

export default function ProfileImageMenu(props) {

    return (
        <SimpleBar style={{ width: '70vw' }} autoHide={false}>
            <div id="Profile-Image-Menu-Container">
                <div className="d-flex">
                    {ProfilePictureImages.map((image,i) => {
                        return (
                            <div key={i} className="card">
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
