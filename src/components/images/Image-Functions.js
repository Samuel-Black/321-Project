/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

// randomize order for given array
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

// return a random character for Throw Eyes game
function returnRandomThrowEyesChar(array) {
    shuffleArray(array);
    return array[0];
}

// randomize order of hop arms game images
function returnRandomHopArmsCharacters(array) {
    let randomizedArray = [];
    let keys = Object.keys(array)

    while(keys.length !== 0) {
        shuffleArray(keys);
        randomizedArray.push(array[keys.pop()]);
    }

    return randomizedArray;
}

// assign values for card type games
function assignCardsValues(keys, array) {
    for (let i = 0; i < array.length; i++) {
        splitCardsString(keys[i], array[i]);
    }
    return array;
}

// assign values for Mix & Match type games
function assignMaMValues(keys, array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = splitMaMString(keys[i], array[i]);
    }
    return array;
}

// assign values for throw eyes game type
function assignThrowEyesValues(array) {
    for (let i = 0; i < array.length; i++) {
        splitThrowEyesString(array[i].default, array[i]);
    }
    return array;
}

// assign values for Hop Arms game type
function assignHopArmsValues(keys, array) {
    for (let i = 0; i < array.length; i++) {
        splitHopArmsString(keys[i], array[i]);
    }
    return array;
}

// split file name for Mix & Match game type images
function splitMaMString(string, object) {
    string = string.split(".");
    string = string[0].split("_");

    const level = string[2].substr(string[2].length - 1, string[2].length) // get the level/difficulty number
    object.difficulty = parseInt(level)

    if(level == 1) {
        // if 1, game type is initially cards, set the correct value according to the name of the image (contains correct or incorrect)
        if(string[3].substr(0, string[3].length - 1) === 'Correct') {
            object.correct = 'true';
        } else 
            object.correct = 'false';
    } 
    else if (level > 1) {
        // if > 1, imported images are now Mix & Match type, set the position according to which panel the image name is and then the correct value accordingly
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

// split file name for cards game type images
function splitCardsString(string, object) {
    string = string.split(".");
    string = string[0].split("_");

    // one card game contains images that are zoomed in and zoomed out, set value if necessary
    if(string[3] === 'Zoom' || string[3] === 'Full') {
        object.zoom = string[3]
    } 
    // set the correct value accordingly to the name of the image
    if(string[2].substr(0, string[2].length - 1) == 'Correct') {
        object.correct = 'true';
    } else {
        object.correct = 'false';
    }
}

// split file name for throw eyes game type
function splitThrowEyesString(string, object) {
    string = string.split("/");
    string = string[3].split(".");
    string = string[0].split("_");

    // if the split string array does not contain 4 values it is not a target
    if(string.length < 4) {
        object.type = 'Target';
    } else {
        // if the split string array does contain 4 values set it to character, and read the eye position
        object.type = 'Character';
        object.eyePosition = string[3];
        object.id = eyePosition(string[3]);
    }
}

// split file name for hope arms game
function splitHopArmsString(string, object) {
    string = string.split(".");
    string = string[0].split("_");

    object.character = string[3]

    if(string[2].substr(0, string[2].length - 1) == 'correct') {
        object.correct = 'true';
    } else {
        object.correct = 'false';
    }
}

// assign a position correlating with the target id based on the eye position
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

// sort array based on the assigned object values when splitting for ThrowEyes
function sortThrowEyesImages(array) {
    
    // three difficulties/levels, easy, medium, hard
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
                easyArray[easy++] = array[i]; // easy array has two options, left and right

            if (array[i].eyePosition == 'Left' || array[i].eyePosition == 'Right' || array[i].eyePosition == 'Center') 
                mediumArray[medium++] = array[i]; // medium array has three options, left, center and right

            // hard array contains all five character options, far left, left, center, right and far right
            hardArray[hard++] = array[i];
        } else {
            // object type is not character, It's the target
            sortedArray.target = array[i]; 
        }
    }

    sortedArray.easy = easyArray;
    sortedArray.medium = mediumArray;
    sortedArray.hard = hardArray;

    return sortedArray;
}

// sort array based on the assigned object values when splitting for Mix & Match game type
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
        if(difficulty === 1) { // if 1, first level/difficulty for Mix & Match is the cards game type, so no further sorting is necessary
            difficulty1Array[difficulty1Count] = array[i];
            difficulty1Count++;
        }
        if(difficulty === 2) { // if 2, sort based on two panels accordingly, panel 1 or panel 2
            if(array[i].position == 'Panel1') {
                panel1Array[0].push(array[i]);
            } else if(array[i].position == 'Panel2') {
                panel2Array[0].push(array[i]);
            }
        }
        if(difficulty === 3) { // if 3, sort based on three panels accordingly, panel 1, panel 2 or panel 3
            if(array[i].position == 'Panel1') {
                panel1Array[1].push(array[i]);
            } else if(array[i].position == 'Panel2') {
                panel2Array[1].push(array[i]);
            } else if(array[i].position == 'Panel3') {
                panel3Array[1].push(array[i]);
            }
        }
    }

    // assign values according to difficulty, panel1Array[0] & panel2Array[0] contain medium difficulty whereas panel1Array[1] etc. contains hard difficulty
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

// sort cards array into correct and incorrect arrays
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

// sort cards with zoom game into correct and incorrect arrays correlating to whether or not the object is zoomed
function sortCardsArrayWithZoom(array) {
    let sortedArray = [];

    sortedArray.Full = []; // not zoomed in array (full image)
    sortedArray.Full.correct = [];
    sortedArray.Full.incorrect = [];
    
    sortedArray.Zoom = []; // zoomed in array
    sortedArray.Zoom.correct = [];
    sortedArray.Zoom.incorrect = [];

    for(let i = 0; i < array.length; i++) {
        if(array[i].correct == 'true') {
            sortedArray[array[i].zoom].correct.push(array[i]);
        } else {
            sortedArray[array[i].zoom].incorrect.push(array[i]);
        }
    }

    return sortedArray;
}

// sort hop arms game for each of the four characters (Orbi, Pod etc.) into incorrect and correct accordingly
function sortHopArmsArray(array) {
    let sortedArray = [];

    // object/array for Orbi character
    sortedArray.orbi = {};
    sortedArray.orbi.correct = [];
    sortedArray.orbi.incorrect = [];
    
    // object/array for Pod character
    sortedArray.pod = {};
    sortedArray.pod.correct = [];
    sortedArray.pod.incorrect = [];
    
    // object/array for Puff character
    sortedArray.puff = {};
    sortedArray.puff.correct = [];
    sortedArray.puff.incorrect = [];
    
    // object/array for Spike character
    sortedArray.spike = {};
    sortedArray.spike.correct = [];
    sortedArray.spike.incorrect = [];

    for(let i = 0; i < array.length; i++) {
        if(array[i].correct == 'true') {
            sortedArray[array[i].character].correct.push(array[i]);
        } else {
            sortedArray[array[i].character].incorrect.push(array[i]);
        }
    }

    return sortedArray;
}

export {
    assignMaMValues,
    assignCardsValues,
    sortCardsArray,
    sortHopArmsArray,
    sortCardsArrayWithZoom,
    shuffleArray,
    sortMaMImages,
    assignThrowEyesValues,
    assignHopArmsValues,
    sortThrowEyesImages,
    returnRandomThrowEyesChar,
    returnRandomHopArmsCharacters
}
