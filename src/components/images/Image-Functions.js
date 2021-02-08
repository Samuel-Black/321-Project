
function assignValues(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = splitString(array[i].default, array[i]);
    }
    return array;
}

function splitString(string, object) {
    string = string.split("/");
    string = string[3].split(".");
    string = string[0].split("_");

    if(string[4] == 'Left') {
        object.position = 'Left';
    } else if(string[4] == 'Right') {
        object.position = 'Right';
    }
    if(string[5].substr(0, string[5].length - 1) == 'Correct') {
        object.correct = true;
    } else {
        object.correct = false;
    }

    return object;
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

function sortImages(array) {
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
    assignValues,
    shuffleArray,
    sortImages
}
