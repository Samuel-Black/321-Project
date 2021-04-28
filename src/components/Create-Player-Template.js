import DatePicker from 'react-date-picker';

export default function CreatePlayerTemplate(setNickname, setBirthday, birthday, createPlayer, errorMessage) {
    return (
        <>
            <div className="d-flex">
                <label htmlFor="nickname" className="align-self-center">Nickname</label>
                </div>
                <div className="d-flex">
                    <div className="form-group">
                        <input type="text" id='nickname' className="form-control-lg" placeholder="nickname" onChange={(e) => setNickname(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex">
                    <label htmlFor="birthday" className="align-self-center">Birthday</label>
                </div>
                <div className="d-flex">
                    <div className="form-group">
                        <DatePicker
                            onChange={setBirthday}
                            value={birthday}
                            maxDate={new Date()}
                            minDetail={'decade'}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    {errorMessage ? <p>{errorMessage}</p> : null}
                <button id="Login-Button" onClick={createPlayer}>Create</button>
            </div>
        </>
    );
}