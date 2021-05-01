
function assignMaMValues(keys, array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = splitMaMString(keys[i], array[i]);
    }
    return array;
}

function splitMaMString(string, object) {
    string = string.split(".");
    string = string[0].split("_");

    const level = string[2].substr(string[2].length - 1, string[2].length)
    object.difficulty = parseInt(level)

    if(level == 1) {
        if(string[3].substr(0, string[3].length - 1) === 'Correct') {
            object.correct = 'true';
        } else 
            object.correct = 'false';
    } 
    else if (level > 1) {
        if(string[3] === 'panel1') {
            object.position = 'Panel1';
        } else if(string[3] === 'panel2') {
            object.position = 'Panel2';
        } else if(string[3] === 'panel3') {
            object.position = 'Panel3';
        }
        if(string[4].substr(0, string[4].length - 1) === 'Correct') {
            object.correct = 'true';
        } else {
            object.correct = 'false';
        }
    }

    return object;
}

function assignCardsValues(keys, array) {
    for (let i = 0; i < array.length; i++) {
        splitCardsString(keys[i], array[i]);
    }
    
    return array;
}

function splitCardsString(string, object) {
    string = string.split(".");
    string = string[0].split("_");
    if(string[3] === 'Zoom' || string[3] === 'Full') {
        object.zoom = string[3]
    } 
    if(string[2].substr(0, string[2].length - 1) == 'Correct') {
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
    let difficulty1Array = [];
    let difficulty2Array = [];
    let difficulty3Array = [];

    let panel1Array = new Array(2);
    let panel2Array = new Array(2);
    let panel3Array = new Array(2);

    for(let i = 0; i < 2; i++) {
        panel1Array[i] = new Array(0);
        panel2Array[i] = new Array(0);
        panel3Array[i] = new Array(0);
    }
    
    let difficulty1Count = 0;

    for(let i = 0; i < array.length; i++) {
        const difficulty = array[i].difficulty
        if(difficulty === 1) {
            difficulty1Array[difficulty1Count] = array[i];
            difficulty1Count++;
        }
        if(difficulty === 2) {
            if(array[i].position == 'Panel1') {
                panel1Array[0].push(array[i]);
            } else if(array[i].position == 'Panel2') {
                panel2Array[0].push(array[i]);
            }
        }
        if(difficulty === 3) {
            if(array[i].position == 'Panel1') {
                panel1Array[1].push(array[i]);
            } else if(array[i].position == 'Panel2') {
                panel2Array[1].push(array[i]);
            } else if(array[i].position == 'Panel3') {
                panel3Array[1].push(array[i]);
            }
        }
    }

    difficulty2Array.Panel1 = panel1Array[0];
    difficulty2Array.Panel2 = panel2Array[0];

    difficulty3Array.Panel1 = panel1Array[1];
    difficulty3Array.Panel2 = panel2Array[1];
    difficulty3Array.Panel3 = panel3Array[1];

    sortedArray.easy = difficulty1Array;
    sortedArray.medium = difficulty2Array;
    sortedArray.hard = difficulty3Array;

    return sortedArray;
}


function sortCardsArray(array) {
    let sortedArray = [];
    let correctArray = []; //correct and incorrect refer to the card options
    let incorrectArray = [];
    
    let correct = 0;
    let incorrect = 0;

    for(let i = 0; i < array.length; i++) {
        if(array[i].correct == 'true') {
            correctArray[correct] = array[i];
            correct++;
        } else {
            incorrectArray[incorrect] = array[i];
            incorrect++;
        }
    }

    sortedArray.correct = correctArray;
    sortedArray.incorrect = incorrectArray;

    return sortedArray;
}

function sortCardsArrayWithZoom(array) {
    let sortedArray = [];

    sortedArray.Full = [];
    sortedArray.Full.correct = [];
    sortedArray.Full.incorrect = [];
    
    sortedArray.Zoom = [];
    sortedArray.Zoom.correct = [];
    sortedArray.Zoom.incorrect = [];
    
    let correct = 0;
    let incorrect = 0;

    for(let i = 0; i < array.length; i++) {
        if(array[i].correct == 'true') {
            sortedArray[array[i].zoom].correct.push(array[i]);
            correct++;
        } else {
            sortedArray[array[i].zoom].incorrect.push(array[i]);
            incorrect++;
        }
    }

    return sortedArray;
}

export {
    assignMaMValues,
    assignCardsValues,
    sortCardsArray,
    sortCardsArrayWithZoom,
    shuffleArray,
    sortMaMImages,
    assignThrowEyesValues,
    sortThrowEyesImages,
    returnRandomThrowEyesChar
}
