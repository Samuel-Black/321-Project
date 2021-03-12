
function assignMaMValues(keys, array) {
    console.log(keys)
    for (let i = 0; i < array.length; i++) {
        array[i] = splitMaMString(keys[i], array[i]);
    }
    return array;
}

function splitMaMString(string, object) {
    //string = string.split("/");
    string = string.split(".");
    string = string[0].split("_");

    if(string[3] == 'Left' || string[3] == 'panel1') {
        object.position = 'Left';
    } else if(string[3] == 'Right' || string[3] == 'panel2') {
        object.position = 'Right';
    }
    if(string[4].substr(0, string[4].length - 1) == 'Correct') {
        object.correct = 'true';
    } else {
        object.correct = 'false';
    }

    return object;
}

function assignThrowEyesValues(array) {
    for (let i = 0; i < array.length; i++) {
        splitThrowEyesString(array[i].default, array[i]);
    }
    return array;
}

function splitThrowEyesString(string, object) {
    string = string.split("/");
    string = string[3].split(".");
    string = string[0].split("_");

    if(string.length < 4) {
        object.type = 'Target';
    } else {
        object.type = 'Character';
        object.eyePosition = string[3];
        object.id = eyePosition(string[3]);
    }

    return object;
}

function eyePosition(position) {
    switch(position) {
        case 'FarLeft':
            return 1;
        case 'Left':
            return 2;
        case 'Center':
            return 3;
        case 'Right':
            return 4;
        case 'FarRight':
            return 5;
    }
}

function sortThrowEyesImages(array) {
    let sortedArray = [];
    let easyArray = [];
    let mediumArray = [];
    let hardArray = [];

    let easy = 0;
    let medium = 0;
    let hard = 0;

    for(let i = 0; i < array.length; i++) {
        if(array[i].type == 'Character') {
            if (array[i].eyePosition == 'Left' || array[i].eyePosition == 'Right') 
                easyArray[easy++] = array[i];
            if (array[i].eyePosition == 'Left' || array[i].eyePosition == 'Right' || array[i].eyePosition == 'Center') 
                mediumArray[medium++] = array[i];
            hardArray[hard++] = array[i];
        } else {
            sortedArray.target = array[i];
        }
    }

    sortedArray.easy = easyArray;
    sortedArray.medium = mediumArray;
    sortedArray.hard = hardArray;

    return sortedArray;
}


function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function returnRandomThrowEyesChar(array) {
    shuffleArray(array);
    return array[0];
}

function sortMaMImages(array) {
    let sortedArray = [];
    let leftArray = [];
    let rightArray = [];
    
    let left = 0;
    let right = 0;

    for(let i = 0; i < array.length; i++) {
        if(array[i].position == 'Left') {
            leftArray[left] = array[i];
            left++;
        } else {
            rightArray[right] = array[i];
            right++;
        }
    }

    sortedArray.left = leftArray;
    sortedArray.right = rightArray;

    return sortedArray;
}

export {
    assignMaMValues,
    shuffleArray,
    sortMaMImages,
    assignThrowEyesValues,
    sortThrowEyesImages,
    returnRandomThrowEyesChar
}
