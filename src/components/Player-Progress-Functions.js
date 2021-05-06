import { GetTotalProgressURL } from './Request-URL';
import { getLocalPlayer } from './localstorage/Local-Storage-Functions';
import Axios from 'axios';


export function getSkillProgress(SkillName, progress) {
    let total = 0;
    for (let i = 0; i < progress.length; i++) {
        if (progress[i].SkillName === SkillName) {
            total += progress[i].LevelsCompleted;
        }
    }
    return total;
}

export function GetProgress(user, currentPlayer, setProgress, setErrorMessage) {

    if(user !== false) { // If using a logged in account, get progress from DB
        Axios.post(GetTotalProgressURL, {
            UserName: user.attributes.sub,
            NickName: currentPlayer.player.NickName
        }).then((response) => {
            setProgress(response.data);
        }).catch((error) => {
            setErrorMessage(error);
        });
    }
    else if(user === false) { // If not using an account and not logged in, get progress from local storage
        let localPlayer = getLocalPlayer(currentPlayer.player.NickName);
        let localPlayerProgress = localPlayer.Progress;
        let localProgress = [];

        for(let skillKey in localPlayerProgress) {
            if(localPlayerProgress.hasOwnProperty(skillKey)) {
                for(let gameKey in localPlayerProgress[skillKey]) {
                    let localLevelsCompleted = parseInt(localPlayerProgress[skillKey][gameKey]);
                    localProgress.push({ 'SkillName': skillKey, 'LevelsCompleted': localLevelsCompleted });
                }
            }
        }

        setProgress(localProgress);
    }
}

/*
export function getCompletedSkills(progress) {
    let completedSkills = [];
    for(const i in Skills) {
        if(getSkillProgress(Skills[i].name, progress) >= Skills[i].numLevels) {
            completedSkills.push(Skills[i].name);
        }
    }
    
    return completedSkills;
}
*/