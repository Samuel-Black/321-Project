/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

// perform relevant actions depending on whether the user/player succesfully completes a level
export default function ValidateWinCondition(correctSelection, setLevelCompleted, setPopupState, setAttemptNumber, attemptNumber) {
    
  if(correctSelection) { // if the correct selection is made
    setLevelCompleted('True'); // set the level completed to True
    setPopupState(true); // show the GamePopup component
    setAttemptNumber(0); // reset the attempt number
  }
  else if(!correctSelection) { // if the incorrect selection is made
    setAttemptNumber(attemptNumber + 1); // increment the level
    setPopupState(true); // show the GamePopup component
  }
  
}