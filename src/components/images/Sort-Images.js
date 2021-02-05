export default function sortImages(array) {
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