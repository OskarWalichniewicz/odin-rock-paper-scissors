/* Computer randomly generates R, P or S
   1. Randomly choose an integer between 0 and 2
   2. Assign it to variable 'roll'
   3. Return 'roll' */
function computerPlay() {
    let roll = Math.floor(Math.random() * 3);
    return roll;
}

computerPlay();