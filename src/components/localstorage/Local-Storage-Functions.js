const LocalIdentifier = '34CUH8sLCXUZTA79X748'; // random string is appended to created player nicknames to ensure only our local storage is used

export function getLocalPlayer(nickname) {
    return JSON.parse(localStorage.getItem(nickname + '-' + LocalIdentifier))
}

export function createLocalPlayer(localProfileImage, localBirthDay, nickname) { // create a new player with default progress
    
    var blankData = {
        'ProfileImage': localProfileImage,
        'Birthday': localBirthDay,
        'Character-Unlock-Progress': 3,
        'Progress': {
            'Balance': {
                'Balance-Eyes': 0,
                'Balance-Legs': 0,
                'Balance-Arms': 0
            },
            'Throw': {
                'Throw-Eyes': 0
            },
            'Kick': {
                'Kick-Eyes': 0,
                'Kick-Foot': 0,
                'Kick-Legs': 0
            },
            'Jump': {
                'Jump-Feet': 0,
                'Jump-Knees': 0,
                'Jump-Arms': 0
            },
            'Run': {
                'Run-Eyes': 0,
                'Run-Arms': 0,
                'Run-Knees': 0
            },
            'Hop': {
                'Hop-Eyes': 0,
                'Hop-Legs': 0,
                'Hop-Arms': 0
            },
            'Slide': {
                'Slide-Feet': 0,
                'Slide-Eyes': 0,
                'Slide-HipsShoulders': 0
            },
            'Leap': {
                'Leap-Eyes': 0,
                'Leap-Legs': 0
            }
        }
    };

    localStorage.setItem(nickname + '-' + LocalIdentifier, JSON.stringify(blankData)) 
}

export function setLocalPlayerList(setPlayerList) { // used in home page to populate the created players list
    var localPlayers = []
    for(let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i).split("-")
        if(key[1] == LocalIdentifier) {
            var temp = JSON.parse(localStorage.getItem(localStorage.key(i)))
            if (temp.ProfileImage > 7 || temp.ProfileImage < 0) // If profile image is not in the defined range set it to 0
                temp.ProfileImage = 0;
            localPlayers.push({ 'NickName': key[0], 'ProfilePicture': temp.ProfileImage })
        }
    }
    setPlayerList(localPlayers)
}

export function updateLocalProgress(nickname, difficulty, SkillName, GameName) { // used to update progress of a local player when a level is completed
    var localPlayer = JSON.parse(localStorage.getItem(nickname + '-' + LocalIdentifier))

    if(typeof localPlayer['Progress'][SkillName] === 'undefined') { // If SkillName does not exist e.g. 'Kick', initialize it
        localPlayer['Progress'][SkillName] = {};
    }
    if(typeof localPlayer['Progress'][SkillName][GameName] === 'undefined') { // If GameName does not exist e.g. 'Kick-Legs', initialize it
        localPlayer['Progress'][SkillName][GameName] = 0;
    }
    
    if(difficulty > parseInt(localPlayer['Progress'][SkillName][GameName])) {
        localPlayer['Progress'][SkillName][GameName] = difficulty
        localStorage.setItem(nickname + '-' + LocalIdentifier, JSON.stringify(localPlayer))
    }
}
