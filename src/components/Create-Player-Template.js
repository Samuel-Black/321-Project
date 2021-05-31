/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import DatePicker from 'react-date-picker';

// component used by Home-Page.js, input for creating a player including player nickname, and birthday
export default function CreatePlayerTemplate(nickname, setNickname, validateNickName, setBirthday, birthday, createPlayer) {

    // if birthday field is empty don't allow player to be created
    const validateBirthday = (thisBirthday) => {
        if (thisBirthday == null || thisBirthday.length === 0)
            return false;
        return createPlayer();
    }

    return (
        <>
            <div className="d-flex">
                <label htmlFor="nickname" className="align-self-center">Nickname</label>
            </div>
            <div className="d-flex">
                <div className="form-group">
                    <input type="text" id='nickname' className="form-control-lg" placeholder="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <label htmlFor="birthday">Birthday</label>
            </div>
            <div className="d-flex  justify-content-center">
                <div className="form-group">
                    <DatePicker
                        onChange={setBirthday}
                        value={birthday}
                        maxDate={new Date()}
                        minDetail={'decade'}
                    />
                </div>
            </div>
            <div className='pt-3'>
                <div>
                    {/*if nickname cannot be validated, disable the button*/}
                    <button id='Create-Player-Button' className={`btn btn-secondary ${(validateNickName() !== true) ? 'button-disabled' : ''}`} onClick={() => validateBirthday(birthday)} disabled={validateNickName() !== true}>Create</button>
                </div>
                <div>
                    {validateNickName() !== true && validateNickName()}
                </div>
                <div>
                    {(birthday == null || birthday.length === 0) ? 'Please input your birthday!' : null}
                </div>
            </div>
        </>
    );
}
