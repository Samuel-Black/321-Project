import { ProfilePictureImages } from './images/ProfilePictureImages'
import { RiLock2Fill } from 'react-icons/ri'
import SimpleBar from 'simplebar-react';
import './Profile-Image-Menu.scss'
import 'simplebar/dist/simplebar.min.css';

export default function ProfileImageMenu(props) {

    return (
        <SimpleBar style={{ minWidth: 860 }} autoHide={false}>
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
