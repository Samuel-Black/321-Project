import DatePicker from 'react-date-picker';

export default function CreatePlayerTemplate(nickname, setNickname, validateNickName, setBirthday, birthday, createPlayer) {

    function validateBirthday() {
        if (birthday == null) {
            return false;
        }
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
                <div><button id='Create-Player-Button' className={`btn btn-secondary ${validateNickName() !== true ? 'button-disabled' : ''}`} onClick={() => validateBirthday()} disabled={validateNickName() !== true}>Create</button></div>
                <div>{validateNickName() !== true && validateNickName()}</div>
                <div>{(birthday == null || birthday.length === 0) ? 'Please input your birthday!' : null}</div>
            </div>
        </>
    );
}
