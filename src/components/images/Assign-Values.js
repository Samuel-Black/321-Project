
export default function assignValues(array) {
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
